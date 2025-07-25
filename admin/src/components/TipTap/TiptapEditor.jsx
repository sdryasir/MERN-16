import './TipTap.css'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import {
  Bold, Italic, Strikethrough, Pilcrow, Code, Heading1, Heading2,
  Heading3, Heading4, Heading5, Heading6, RemoveFormatting, Eraser,
  ListOrdered, List, SquareDashedBottomCode, Minus, TableRowsSplit,
  MessageSquareQuote, Undo2, Redo2,
} from 'lucide-react'

// Editor extensions
const extensions = [StarterKit, TextStyle]

function MenuBar({ editor }) {
  if (!editor) return null

  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isBold: ctx.editor.isActive('bold'),
      canBold: ctx.editor.can().chain().focus().toggleBold().run(),
      isItalic: ctx.editor.isActive('italic'),
      canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
      isStrike: ctx.editor.isActive('strike'),
      canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
      isCode: ctx.editor.isActive('code'),
      canCode: ctx.editor.can().chain().focus().toggleCode().run(),
      canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
      isParagraph: ctx.editor.isActive('paragraph'),
      isHeading1: ctx.editor.isActive('heading', { level: 1 }),
      isHeading2: ctx.editor.isActive('heading', { level: 2 }),
      isHeading3: ctx.editor.isActive('heading', { level: 3 }),
      isHeading4: ctx.editor.isActive('heading', { level: 4 }),
      isHeading5: ctx.editor.isActive('heading', { level: 5 }),
      isHeading6: ctx.editor.isActive('heading', { level: 6 }),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isCodeBlock: ctx.editor.isActive('codeBlock'),
      isBlockquote: ctx.editor.isActive('blockquote'),
      canUndo: ctx.editor.can().chain().focus().undo().run(),
      canRedo: ctx.editor.can().chain().focus().redo().run(),
    }),
  })

  return (
    <div className="control-group">
      <div className="button-group">
        <span onClick={() => editor.chain().focus().toggleBold().run()} className={editorState.isBold ? 'is-active' : ''}><Bold /></span>
        <span onClick={() => editor.chain().focus().toggleItalic().run()} className={editorState.isItalic ? 'is-active' : ''}><Italic /></span>
        <span onClick={() => editor.chain().focus().toggleStrike().run()} className={editorState.isStrike ? 'is-active' : ''}><Strikethrough /></span>
        <span onClick={() => editor.chain().focus().toggleCode().run()} className={editorState.isCode ? 'is-active' : ''}><Code /></span>
        <span onClick={() => editor.chain().focus().unsetAllMarks().run()}><Eraser /></span>
        <span onClick={() => editor.chain().focus().clearNodes().run()}><RemoveFormatting /></span>
        <span onClick={() => editor.chain().focus().setParagraph().run()} className={editorState.isParagraph ? 'is-active' : ''}><Pilcrow /></span>
        <span onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editorState.isHeading1 ? 'is-active' : ''}><Heading1 /></span>
        <span onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editorState.isHeading2 ? 'is-active' : ''}><Heading2 /></span>
        <span onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editorState.isHeading3 ? 'is-active' : ''}><Heading3 /></span>
        <span onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editorState.isHeading4 ? 'is-active' : ''}><Heading4 /></span>
        <span onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editorState.isHeading5 ? 'is-active' : ''}><Heading5 /></span>
        <span onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editorState.isHeading6 ? 'is-active' : ''}><Heading6 /></span>
        <span onClick={() => editor.chain().focus().toggleBulletList().run()} className={editorState.isBulletList ? 'is-active' : ''}><List /></span>
        <span onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editorState.isOrderedList ? 'is-active' : ''}><ListOrdered /></span>
        <span onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editorState.isCodeBlock ? 'is-active' : ''}><SquareDashedBottomCode /></span>
        <span onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editorState.isBlockquote ? 'is-active' : ''}><MessageSquareQuote /></span>
        <span onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus /></span>
        <span onClick={() => editor.chain().focus().setHardBreak().run()}><TableRowsSplit /></span>
        <span onClick={() => editor.chain().focus().undo().run()} className={!editorState.canUndo ? 'disabled' : ''}><Undo2 /></span>
        <span onClick={() => editor.chain().focus().redo().run()} className={!editorState.canRedo ? 'disabled' : ''}><Redo2 /></span>
      </div>
    </div>
  )
}

export default function TiptapEditor({ initialContent = '', setDescription }) {
  const editor = useEditor({
    extensions,
    content: initialContent,
    onUpdate({ editor }) {
      const html = editor.getHTML()
      setDescription(html)
    },
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}