"use client";

import React from 'react';
import { useRef, useEffect, useState } from "react";

const CodeEditor = ({
  source="",
}) => {
  const codeEditor = useRef(null);

  useEffect(() => {
    const codeEditorFrame = codeEditor.current;

    codeEditorFrame.contentWindow.postMessage({
      eventType: 'populateCode',
      language: 'java',
      files: [
        {
          "name": "PortaCompliment.java",
          "content": source,
        }
      ]
    }, "*");
  }, []);

  return (
    <div className="w-full">
      <iframe
      ref={codeEditor}
      frameBorder="0"
      height="450px"  
      src="https://onecompiler.com/embed/java?theme=dark&listenToEvents=true" 
      width="100%"
      ></iframe>
    </div>
  );
};

export default CodeEditor;