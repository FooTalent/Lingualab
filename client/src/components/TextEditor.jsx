// src/components/RichTextEditor.js
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': '1'}, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'ltr' }], // Configura el texto de izquierda a derecha
          [{ 'size': ['small', 'medium', 'large', 'huge'] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          ['clean']
        ]
      },
      placeholder: 'Escribe algo...',
      readOnly: false,
      direction: 'ltr' // Configura la dirección del texto a izquierda a derecha
    });

    const handleChange = () => {
      onChange(quillRef.current.root.innerHTML);
    };

    quillRef.current.on('text-change', handleChange);

    return () => {
      quillRef.current.off('text-change', handleChange);
    };
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current) {
      // Guardar la posición del cursor
      const range = quillRef.current.getSelection();
      const cursorPosition = range ? range.index : 0;

      // Actualizar el contenido del editor
      quillRef.current.root.innerHTML = value;

      // Restaurar la posición del cursor
      if (range) {
        quillRef.current.setSelection(cursorPosition, 0);
      }
    }
  }, [value]);

  return <div ref={editorRef} />;
};

export default TextEditor;
