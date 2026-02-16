"use client"

export const dynamic = "force-dynamic"

import dynamicImport from "next/dynamic"
import { useRef, useState } from "react"
import ARControls from "../components/ARControls"

/* ---------- LOAD ARSCENE ONLY IN BROWSER ---------- */

const ARScene = dynamicImport(
  ()=>import("./ARScene"),
  { ssr:false }
)

export default function ARPage(){

  const modelRef = useRef<any>(null)
  const [tracked,setTracked] = useState(false)

  const startAR = async ()=>{

    if(!navigator.xr) return

    const img = new Image()
    img.src = "/targets/note.jpeg"
    await img.decode()

    const bitmap = await createImageBitmap(img)

    const xrStore = (window as any).xrStore

    /* TRACK IMAGE */
    xrStore.setState({
      trackedImages:[{
        image:bitmap,
        widthInMeters:0.075
      }]
    })

    await xrStore.enterAR()
  }

  const rotate = ()=> modelRef.current?.rotate()
  const scaleUp = ()=> modelRef.current?.scaleUp()
  const scaleDown = ()=> modelRef.current?.scaleDown()

  return(
    <>
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

      {tracked && (
        <ARControls
          rotate={rotate}
          scaleUp={scaleUp}
          scaleDown={scaleDown}
        />
      )}
    </>
  )
}