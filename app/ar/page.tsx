"use client"

import { useRef, useState } from "react"
import ARScene, { store } from "./ARScene"
import ARControls from "../components/ARControls"

export default function ARPage(){

  const modelRef = useRef<any>(null)
  const [tracked,setTracked] = useState(false)

  const startAR = async ()=>{

    if(!navigator.xr) return

    /* LOAD TARGET IMAGE */

    const img = new Image()
    img.src = "/targets/note.jpeg"
    await img.decode()

    const bitmap = await createImageBitmap(img)

    /* IMPORTANT: widen XR store type */

    ;(store as any).setState({
      trackedImages:[{
        image:bitmap,
        widthInMeters:0.075   // 7.5cm sticky note
      }]
    })

    const xrStore = (window as any).xrStore
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