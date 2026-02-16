"use client"

import { useRouter } from "next/navigation"

export default function Home(){

  const router = useRouter()

  return(
    <main
      style={{
        minHeight:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        background:"#020617",
        color:"#fff",
        padding:24,
        textAlign:"center"
      }}
    >

      <h1
        style={{
          fontSize:38,
          marginBottom:12,
          fontWeight:600
        }}
      >
        Image Tracking AR
      </h1>

      <p
        style={{
          maxWidth:420,
          opacity:0.8,
          marginBottom:24,
          lineHeight:1.6,
          fontSize:16
        }}
      >
        Scan the printed marker to view the 3D model placed in your real environment.
        Works directly from your mobile browser.
      </p>

      <div
        style={{
          background:"#0f172a",
          padding:18,
          borderRadius:14,
          marginBottom:36,
          maxWidth:420,
          textAlign:"left"
        }}
      >
        <p
          style={{
            fontSize:14,
            opacity:0.7,
            marginBottom:8
          }}
        >
          Before you begin:
        </p>

        <ul
          style={{
            fontSize:14,
            lineHeight:1.8,
            paddingLeft:18
          }}
        >
          <li>Use Android Chrome</li>
          <li>Allow camera access</li>
          <li>Keep the marker visible</li>
          <li>Ensure good lighting</li>
        </ul>
      </div>

      <button
        onClick={()=>router.push("/ar")}
        style={{
          padding:"16px 44px",
          fontSize:18,
          background:"#22c55e",
          border:"none",
          borderRadius:12,
          color:"#020617",
          fontWeight:600,
          cursor:"pointer"
        }}
      >
        Start AR Experience
      </button>

      <p
        style={{
          fontSize:12,
          marginTop:18,
          opacity:0.5
        }}
      >
        Desktop browsers are not supported.
      </p>

    </main>
  )
}