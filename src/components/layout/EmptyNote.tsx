import React from "react"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"

export default React.memo((props: { newNote: Function }) => {
  return (
    <div className="w-full h[100%] bg-amber-100 flex items-center justify-center">
      <Button
        onClick={() => props.newNote()}
        className="bg-transparent [&:hover]:bg-transparent text-stone-300 dark:text-stone-800"
      >
        <Plus className="w-6.25 h-6.25" />
        New Note
      </Button>
    </div>
  )
})
