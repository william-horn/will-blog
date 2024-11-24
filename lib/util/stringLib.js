
export const escapeRegex = string => {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const parseCode = source => {
  // const lines = source.split("\n");
  const lines = [];
  const parsedLines = [];

  for (let match of source.matchAll(/(.*?\n)/g)) {
    lines[lines.length] = match[1];
  }

  const getFirstWord = str => {
    const value = str.match(/^[a-zA-Z]+[\d_a-zA-Z]*/)?.[0];
    return value ? { type: "word", value, token: value } : null;
  }

  const getFirstSymbol = str => {
    const value = str.match(/^[^\d\w]/)?.[0];
    return value ? { type: "symbol", value, token: value } : null;
  }

  const getFirstNumber = str => {
    const value = str.match(/^\d+/)?.[0];
    return value ? { type: "number", value, token: value } : null;
  }

  const getFirstString = str => {
    const value = str.match(/^(["']).*?\1/)?.[0];
    return value ? { type: "string", value, token: value } : null;
  }

  const getFirstSpace = str => {
    const value = str.match(/^\s+/)?.[0];
    return value ? { type: "space", value: value.replaceAll(" ", "&nbsp;"), token: value } : null;
  }

  const getFistComment = str => {
    const value = str.match(/^\/\/.*/)?.[0];
    return value ? { type: "comment", value, token: value } : null;
  }

  const getFirstNewLine = (str, index) => {
    const value = str.match(/^\n/);
    return (index == 0) && (value ? { type: "newline", value: value[0], token: value[0] } : null);
  }

  const getFirstToken = (str, index) => {
    return getFirstWord(str)
      || getFirstNewLine(str, index)
      || getFirstSpace(str)
      || getFirstString(str)
      || getFistComment(str)
      || getFirstSymbol(str)
      || getFirstNumber(str)
  }

  let tabIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let marker = line;
    let tokenData = getFirstToken(marker, (i > 0) ? 0 : 1)

    if (tokenData) {
      const parsedLine = {
        tabIndex,
        line: [],
      };

      do {
        if (tokenData.token == "}") {
          tabIndex = Math.max(0, tabIndex - 1);
          parsedLine.tabIndex = tabIndex;
        }

        parsedLine.line[parsedLine.line.length] = tokenData;

        if (tokenData.token == "{") tabIndex++;

        marker = marker.substring(tokenData.token.length);
        tokenData = getFirstToken(marker, 1);
      } while (tokenData)

      parsedLines[parsedLines.length] = parsedLine;
    }
  } 

  return parsedLines;
}
