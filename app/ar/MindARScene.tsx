"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function MindARScene(){

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{

    let mindarThree:any

    const start = async()=>{

      const { MindARThree } =
      await import("mind-ar/dist/mindar-image-three.prod.js")

      const { GLTFLoader } =
      await import("three/examples/jsm/loaders/GLTFLoader.js")

      mindarThree = new MindARThree({
        container:containerRef.current,
        imageTargetSrc:"/targets/text.mind",
        maxTrack:1
      })

      const {renderer,scene,camera} =
      mindarThree

      const anchor =
      mindarThree.addAnchor(0)

      const loader =
      new GLTFLoader()

      loader.load("/models/1.glb",(gltf:any)=>{

        const model = gltf.scene

        /* -------- AUTO SCALE -------- */

        const box =
        new THREE.Box3().setFromObject(model)

        const size =
        new THREE.Vector3()

        box.getSize(size)

        const max =
        Math.max(size.x,size.y,size.z)

        const targetSize = 0.4
        const scale = targetSize / max

        model.scale.setScalar(scale)

        model.position.y = 0.02
        model.rotation.y = Math.PI / 2

        /* -------- SMOOTH GROUP -------- */

        const smoothed = new THREE.Group()
        smoothed.add(model)

        /* ATTACH TO ANCHOR (VERY IMPORTANT) */

        anchor.group.add(smoothed)

        const targetPos = new THREE.Vector3()
        const targetRot = new THREE.Quaternion()

        renderer.setAnimationLoop(()=>{

          if(anchor.group.visible){

            targetPos.copy(anchor.group.position)
            targetRot.copy(anchor.group.quaternion)

            smoothed.position.lerp(
              targetPos,
              0.08
            )

            smoothed.quaternion.slerp(
              targetRot,
              0.08
            )

            smoothed.position.y =
            targetPos.y + 0.02
          }

          renderer.render(scene,camera)
        })

      })

      const light =
      new THREE.HemisphereLight(0xffffff,0xbbbbff,1)

      scene.add(light)

      await mindarThree.start()

      /* FULLSCREEN VIDEO */

      const video = mindarThree.video

      video.style.position="fixed"
      video.style.top="0"
      video.style.left="0"
      video.style.width="100vw"
      video.style.height="100vh"
      video.style.objectFit="cover"
      video.style.zIndex="0"

      renderer.domElement.style.position="fixed"
      renderer.domElement.style.top="0"
      renderer.domElement.style.left="0"
      renderer.domElement.style.width="100vw"
      renderer.domElement.style.height="100vh"
      renderer.domElement.style.zIndex="1"
    }

    start()

    return()=>{
      mindarThree?.stop()
    }

  },[])

  return(
    <div
      ref={containerRef}
      style={{
        position:"fixed",
        top:0,
        left:0,
        width:"100vw",
        height:"100vh",
        overflow:"hidden"
      }}
    />
  )
}