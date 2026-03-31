import React from "react"
import TipTapEditor from "./tiptap-template"

export default React.memo((props: any) => {
  const handleChange = React.useCallback((api: any, ev: any) => {
    console.log("api", api)
  }, [])
  return (
    <div>
      <TipTapEditor onChange={handleChange} />
    </div>
  )
})
