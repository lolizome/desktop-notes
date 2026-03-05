import React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"

export default React.memo((props: any) => {
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
      props.onChange(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert focus:outline-none max-w-none p-4 min-h-[300px]",
      },
    },
  })

  return (
    <div className="tiptap-wrapper border border-stone-200 dark:border-stone-800 rounded-md bg-white dark:bg-stone-950">
      <EditorContent editor={editor} />
    </div>
  )
})
