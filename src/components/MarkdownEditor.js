import React, { forwardRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';

export const MarkdownEditor = forwardRef(({ value, onChange }, ref) => {

  return (
    <Editor
      ref={ref}
      value={value}
      onValueChange={onChange}
      highlight={code => highlight(code, languages.markdown)}
      padding={10}
      className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full"
      style={{
        // overflowY: 'auto',
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        // height: '100%',
        // maxHeight: 550,
        // paddingLeft: '1rem',
      }}
    />
  )
})
