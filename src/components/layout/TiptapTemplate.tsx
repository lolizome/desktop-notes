import React, { useRef } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import { TNote } from "@/shared/types"

export default React.memo((props: any) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Highlight,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: props.initialData || "<p>Start to write...</p>",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      const TNoteData: TNote = {
        time: Date.now(),
        blocks: (json.content || []).map((block: any) => ({
          id: Math.random().toString(36).substring(2, 15),
          type: block.type,
          data: {
            text: block.content?.[0].text || "",
          },
        })),
        type: json.type || "doc",
      }

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        props.onChange(TNoteData)
      }, 500)
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert focus:outline-none max-w-none p-4 min-h-[300px]",
      },
    },
  })

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="tiptap-wrapper border border-stone-200 dark:border-stone-800 rounded-md bg-white dark:bg-stone-950">
      <EditorContent editor={editor} />
    </div>
  )
})
