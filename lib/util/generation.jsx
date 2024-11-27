
import { v4 as uuidv4 } from 'uuid';

import { parseCode } from './stringLib';

export const generateSyntaxHighlightedCode = source => {
  let parsedCode;

  if (typeof(source) == "string") {
    parsedCode = parseCode(source);
  } else if (typeof(source) == "object") {
    parsedCode = source;
  }
  
  const objectColor = "text-[var(--object-color)]";
  const typeColor = "text-[var(--type-color)]";
  const regularColor = "text-[var(--regular-color)]";
  const stringColor = "text-[var(--string-color)]";
  const numberColor = "text-[var(--number-color)]";
  const operatorColor = "text-[var(--operator-color)]";
  const commentColor = "text-[var(--comment-color)]";

  const syntaxColors = {
    "String": objectColor,
    "Object": objectColor,
    "Integer": objectColor,
    "Character": objectColor,
    "public": objectColor,
    "class": objectColor,
    "static": objectColor,
    
    "for": typeColor,
    "if": typeColor,
    "while": typeColor,
    "+": typeColor,
    "-": typeColor,
    "*": typeColor,
    "/": typeColor,
    "?": typeColor,
    "%": typeColor,
    "<": typeColor,
    ">": typeColor,
    "int": typeColor,
    "return": typeColor,
    "try": typeColor,
    "catch": typeColor,
    "boolean": typeColor,
    "!": typeColor,
    "&": typeColor,
    "|": typeColor,
    "char": typeColor,
    "double": typeColor,
    "float": typeColor,
    "else": typeColor,

    "=": operatorColor,

    ";": regularColor,
    ":": regularColor,
    "(": regularColor,
    ")": regularColor,
    "{": regularColor,
    "}": regularColor,
    "[": regularColor,
    "]": regularColor,
    ".": regularColor,
    ",": regularColor,
    "toString": regularColor,

    "null": numberColor,

    types: {
      "string": stringColor,
      "number": numberColor,
      "comment": commentColor,
    }
  }

  const getSpanFromToken = ({type, value, token}, key) => {
    switch (type) {
      case "word": return <span key={key} className={`${syntaxColors[token] || regularColor}`}>{value}</span>
      case "string": return <span key={key} className={`${syntaxColors.types[type]}`}>{value}</span>
      case "space": return <span key={key}>{token}</span>
      case "number": return <span key={key} className={`${syntaxColors.types[type]}`}>{value}</span>
      case "symbol": return <span key={key} className={`${syntaxColors[token]}`}>{value}</span> 
      case "comment": return <span key={key} className={`${syntaxColors.types[type]}`}>{value}</span> 
      case "newline": return <span style={{whiteSpace: "pre"}} key={key}>{"\n"}</span>
    }
  }

  return <span className="font-mono code-theme-0">
    {
      parsedCode.map((parsedLine, lineIndex) => {
        return <span key={lineIndex} className="flex flex-row code-line">
          <span style={{whiteSpace: "pre"}}>{"\t".repeat(parsedLine.tabIndex)}</span>
          <span>
            {
              parsedLine.line.map((tokenData, tokenIndex) => { 
                return getSpanFromToken(tokenData, tokenIndex)
              }
            )}
          </span>
        </span>
      })
    }
  </span>
}