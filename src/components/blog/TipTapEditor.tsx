import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Type, List, ListOrdered, Code, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ value, onChange, placeholder }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };
  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      {/* Toolbar */}
      <div
        className="flex flex-wrap gap-1 p-2 border-b"
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <button
          onClick={toggleHeading2}
          className="p-2 rounded transition-colors"
          title="Heading"
          style={{
            backgroundColor: editor.isActive('heading', { level: 2 }) ? 'var(--primary)' : 'transparent',
            color: editor.isActive('heading', { level: 2 }) ? 'white' : 'var(--foreground)',
          }}
        >
          <Type className="w-4 h-4" />
        </button>

        <button
          onClick={toggleBold}
          className="p-2 rounded transition-colors"
          title="Bold"
          style={{
            backgroundColor: editor.isActive('bold') ? 'var(--primary)' : 'transparent',
            color: editor.isActive('bold') ? 'white' : 'var(--foreground)',
          }}
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onClick={toggleItalic}
          className="p-2 rounded transition-colors"
          title="Italic"
          style={{
            backgroundColor: editor.isActive('italic') ? 'var(--primary)' : 'transparent',
            color: editor.isActive('italic') ? 'white' : 'var(--foreground)',
          }}
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          onClick={toggleUnderline}
          className="p-2 rounded transition-colors"
          title="Underline"
          style={{
            backgroundColor: editor.isActive('underline') ? 'var(--primary)' : 'transparent',
            color: editor.isActive('underline') ? 'white' : 'var(--foreground)',
          }}
        >
          <u>U</u>
        </button>

        <div className="w-px" style={{ backgroundColor: 'var(--border-color)' }} />

        <button
          onClick={toggleBulletList}
          className="p-2 rounded transition-colors"
          title="Bullet List"
          style={{
            backgroundColor: editor.isActive('bulletList') ? 'var(--primary)' : 'transparent',
            color: editor.isActive('bulletList') ? 'white' : 'var(--foreground)',
          }}
        >
          <List className="w-4 h-4" />
        </button>

        <button
          onClick={toggleOrderedList}
          className="p-2 rounded transition-colors"
          title="Ordered List"
          style={{
            backgroundColor: editor.isActive('orderedList') ? 'var(--primary)' : 'transparent',
            color: editor.isActive('orderedList') ? 'white' : 'var(--foreground)',
          }}
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          onClick={toggleCodeBlock}
          className="p-2 rounded transition-colors"
          title="Code Block"
          style={{
            backgroundColor: editor.isActive('codeBlock') ? 'var(--primary)' : 'transparent',
            color: editor.isActive('codeBlock') ? 'white' : 'var(--foreground)',
          }}
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px" style={{ backgroundColor: 'var(--border-color)' }} />

        <button
          onClick={addLink}
          className="p-2 rounded transition-colors"
          title="Add Link"
          style={{
            backgroundColor: editor.isActive('link') ? 'var(--primary)' : 'transparent',
            color: editor.isActive('link') ? 'white' : 'var(--foreground)',
          }}
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          onClick={addImage}
          className="p-2 rounded transition-colors"
          title="Add Image"
          style={{
            color: 'var(--foreground)',
          }}
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-96 focus:outline-none"
        style={{
          backgroundColor: 'transparent',
          color: 'var(--foreground)',
        }}
      />
    </div>
  );
}
