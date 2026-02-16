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
        model.scale.set(0.12,0.12,0.12)
        anchor.group.add(model)
      })

      const light =
      new THREE.HemisphereLight(0xffffff,0xbbbbff,1)

      scene.add(light)

      /* START CAMERA FIRST */
      await mindarThree.start()

      /* NOW FORCE FULLSCREEN */

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

      renderer.setAnimationLoop(()=>{
        renderer.render(scene,camera)
      })
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