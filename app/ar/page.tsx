"use client"

export const dynamic = "force-dynamic"

import dynamicImport from "next/dynamic"

/* LOAD MINDAR ONLY IN BROWSER */

const MindARScene =
dynamicImport(
  ()=>import("./MindARScene"),
  { ssr:false }
)

export default function ARPage(){

  return(
    <MindARScene/>
  )
}