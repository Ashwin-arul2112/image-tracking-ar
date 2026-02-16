"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { XR, createXRStore } from "@react-three/xr"
import { useGLTF } from "@react-three/drei"
import { forwardRef, useImperativeHandle, useRef } from "react"

/* ---------- BROWSER STORE ---------- */

let xrStore:any=null

export const getXRStore=()=>{

  if(typeof window==="undefined") return null

  if(!xrStore){

    xrStore=createXRStore({
      sessionInit:{
        requiredFeatures:["image-tracking","local"],
        optionalFeatures:["dom-overlay"],
        domOverlay:{root:document.body},
        environmentBlendMode:"alpha-blend"
      }
    } as any)

    ;(window as any).xrStore=xrStore
  }

  return xrStore
}

/* ---------- MODEL ---------- */

const Model=forwardRef(({setTracked}:any,ref:any)=>{

  const modelRef=useRef<any>(null)
  const { scene }=useGLTF("/models/1.glb")

  useFrame((_,__,frame)=>{

    if(!frame) return

    const results=(frame as any)
    .getImageTrackingResults?.()

    if(!results) return

    for(const result of results){

      if(result.trackingState==="tracked"){

        const refSpace=
        getXRStore()?.getState().originReferenceSpace
        if(!refSpace) return

        const pose=
        frame.getPose(result.imageSpace,refSpace)
        if(!pose) return

        const pos=pose.transform.position
        const rot=pose.transform.orientation

        modelRef.current.visible=true

        modelRef.current.position.set(pos.x,pos.y,pos.z)

        modelRef.current.quaternion.set(
          rot.x,rot.y,rot.z,rot.w
        )

        setTracked(true)
      }
    }
  })

  useImperativeHandle(ref,()=>({

    rotate(){
      if(!modelRef.current) return
      modelRef.current.rotation.y+=0.3
    },

    scaleUp(){
      if(!modelRef.current) return
      modelRef.current.scale.multiplyScalar(1.1)
    },

    scaleDown(){
      if(!modelRef.current) return
      modelRef.current.scale.multiplyScalar(0.9)
    }

  }))

  return(
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.15}
      visible={false}
    />
  )
})

/* ---------- CANVAS ---------- */

export default forwardRef((props:any,ref)=>(
  <Canvas
    gl={{
      alpha:true,
      preserveDrawingBuffer:true
    }}
    style={{
      position:"absolute",
      top:0,
      left:0,
      width:"100vw",
      height:"100vh",
      background:"transparent"
    }}
  >
    <XR store={getXRStore()}>
      <ambientLight intensity={1}/>
      <Model ref={ref} {...props}/>
    </XR>
  </Canvas>
))