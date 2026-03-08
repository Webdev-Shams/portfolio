"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { common, createLowlight } from "lowlight";
import {
    Bold, Italic, List, ListOrdered, Quote, Code,
    Image as ImageIcon, Link as LinkIcon, Underline as UnderlineIcon,
    Heading1, Heading2, Heading3, Undo, Redo
} from "lucide-react";

const lowlight = createLowlight(common);

interface EditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const MenuButton = ({
    onClick,
    active = false,
    disabled = false,
    children
}: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${active ? 'text-[var(--color-accent)] bg-zinc-800' : 'text-zinc-400'}`}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
        {children}
    </button>
);

export default function TiptapEditor({ content, onChange, placeholder = "Write something remarkable..." }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[var(--color-accent)] underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg border border-[var(--color-border)] max-w-full h-auto my-4',
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'tiptap-editor focus:outline-none',
            },
        },
    });

    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('Enter image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-col gap-2">
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    padding: '8px',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px 8px 0 0',
                    borderBottom: 'none'
                }}
            >
                <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
                    <Bold size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
                    <Italic size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
                    <UnderlineIcon size={18} />
                </MenuButton>
                <div style={{ width: '1px', background: 'var(--color-border)', margin: '4px' }} />
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
                    <Heading1 size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
                    <Heading2 size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
                    <Heading3 size={18} />
                </MenuButton>
                <div style={{ width: '1px', background: 'var(--color-border)', margin: '4px' }} />
                <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
                    <List size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
                    <ListOrdered size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
                    <Quote size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>
                    <Code size={18} />
                </MenuButton>
                <div style={{ width: '1px', background: 'var(--color-border)', margin: '4px' }} />
                <MenuButton onClick={setLink} active={editor.isActive('link')}>
                    <LinkIcon size={18} />
                </MenuButton>
                <MenuButton onClick={addImage}>
                    <ImageIcon size={18} />
                </MenuButton>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                    <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                        <Undo size={18} />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                        <Redo size={18} />
                    </MenuButton>
                </div>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
