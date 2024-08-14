import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './TextEditor.css';
import { imageHandler } from './imageHandler';

const TextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': '1'}, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', 'medium', 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            ['clean']
          ]
        },
        placeholder: 'Escribe aquí...',
        readOnly: false,
        handlers: imageHandler,
      });

      quillRef.current.on('text-change', () => {
        onChange(quillRef.current.root.innerHTML);
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
      }
    };
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return <div className='quill-editor' ref={editorRef} />;
};

export default TextEditor;
