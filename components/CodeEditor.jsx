"use client";

import React from 'react';
import { useRef, useEffect, useState } from "react";
// import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter, useParams } from 'next/navigation';
import useHash from '@/hooks/useHash';

const CodeEditor = ({
  source="",
}) => {
  const codeEditor = useRef(null);
  
  const params = useParams();
  const hash = useHash();

  console.log("Hash: ", hash);

  useEffect(() => {
    console.log("RERENDERED COMPONENT");
    const codeEditorFrame = codeEditor.current;

    const response = codeEditorFrame.contentWindow.postMessage({
      eventType: 'populateCode',
      language: 'java',
      files: [
        {
          "name": "PortaCompliment.java",
          "content": source,
        }
      ]
    }, "*");

    console.log("response: ", response);

  }, []);

  return (
    <div className="w-full">
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