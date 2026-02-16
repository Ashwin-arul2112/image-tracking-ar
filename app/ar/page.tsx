"use client"

export const dynamic="force-dynamic"

import dynamicImport from "next/dynamic"
import { useRef, useState } from "react"
import ARControls from "../components/ARControls"

const ARScene=dynamicImport(
  ()=>import("./ARScene"),
  { ssr:false }
)

export default function ARPage(){

  const modelRef=useRef<any>(null)
  const [tracked,setTracked]=useState(false)

  const startAR=async()=>{

    if(!navigator.xr) return

    const xrStore=(window as any).xrStore
    if(!xrStore) return

    const img=new Image()
    img.src="/targets/note1.jpeg"
    await img.decode()

    const bitmap=
    await createImageBitmap(img)

    xrStore.setState({
      trackedImages:[{
        image:bitmap,
        widthInMeters:0.075
      }]
    })

    await xrStore.enterAR()
  }

  const rotate=()=>modelRef.current?.rotate()
  const scaleUp=()=>modelRef.current?.scaleUp()
  const scaleDown=()=>modelRef.current?.scaleDown()

  return(
    <div
      style={{
        position:"fixed",
        top:0,
        left:0,
        width:"100vw",
        height:"100vh",
        overflow:"hidden",
        background:"transparent"
      }}
    >

      <button
        onClick={startAR}
        style={{
          position:"absolute",
          top:20,
          left:20,
          zIndex:10,
          padding:12
        }}
      >
        START AR
      </button>

      <ARScene
        ref={modelRef}
        setTracked={setTracked}
      />

      {tracked&&(
        <ARControls
          rotate={rotate}
          scaleUp={scaleUp}
          scaleDown={scaleDown}
        />
      )}

    </div>
  )
}