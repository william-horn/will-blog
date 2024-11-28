"use client";

import React from 'react';
import { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from 'next/navigation';
// import { useSearchParams, usePathname } from 'next/navigation';

const CodeEditor = ({
  source="",
}) => {
  const codeEditor = useRef(null);
  const params = useParams();

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

    codeEditorFrame.contentWindow.postMessage({
      eventType: 'triggerRun'
    }, "*");

  }, []);

  return (
    <div className="w-full h-[450px]">
      <iframe
      ref={codeEditor}
      frameBorder="0"
      height="450px"  
      src="https://onecompiler.com/embed/java?theme=dark&listenToEvents=true&hideNew=true&hideNewFileOption=true&hideStdin=true&hideLanguageSelection=true" 
      width="100%"
      ></iframe>
    </div>
  );
};

export default CodeEditor;