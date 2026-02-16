"use client"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  return (
    <main
      style={{
        minHeight:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        background:"#0f172a",
        color:"#fff",
        padding:24,
        textAlign:"center"
      }}
    >

      <h1 style={{
        fontSize:36,
        marginBottom:10
      }}>
        WebXR Image Tracking AR
      </h1>

      <p style={{
        maxWidth:420,
        opacity:0.8,
        marginBottom:30,
        lineHeight:1.6
      }}>
        Point your camera at the green marker to place the 3D model in the real world.
        Make sure you're using a supported mobile browser.
      </p>

      <div
        style={{
          background:"#1e293b",
          padding:16,
          borderRadius:12,
          marginBottom:40,
          maxWidth:420
        }}
      >
        <p style={{fontSize:14,opacity:0.7}}>
          Requirements:
        </p>
        <ul style={{
          textAlign:"left",
          fontSize:14,
          marginTop:8,
          lineHeight:1.8
        }}>
          <li>Android Chrome</li>
          <li>Camera Permission</li>
          <li>Printed / Visible Marker</li>
        </ul>
      </div>

      <button
        onClick={()=>router.push("/ar")}
        style={{
          padding:"16px 40px",
          fontSize:18,
          background:"#22c55e",
          border:"none",
          borderRadius:10,
          color:"#000",
          fontWeight:600,
          cursor:"pointer"
        }}
      >
        Start AR Experience
      </button>

      <p style={{
        fontSize:12,
        marginTop:20,
        opacity:0.5
      }}>
        Desktop browsers are not supported.
      </p>

    </main>
  )
}