import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import useMediaQuery from "../hooks/useMediaQuery";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="w-full h-full overflow-hidden max-w-full">
      <div className="rounded-md overflow-hidden w-full h-full">
        <Editor
          height="85vh"
          width="70vw"
          language={language || "javascript"}
          value={value}
          theme={theme}
          defaultValue="// some comment"
          onChange={handleEditorChange}
          options={{
            fontSize: isMobile ? 12 : 14,
            minimap: { enabled: !isMobile },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            lineNumbers: "on",
            glyphMargin: false,
            folding: !isMobile,
            lineDecorationsWidth: isMobile ? 5 : 10,
            lineNumbersMinChars: isMobile ? 3 : 5,
            padding: { top: isMobile ? 8 : 12, bottom: isMobile ? 8 : 12 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: isMobile ? 8 : 10,
              horizontalScrollbarSize: isMobile ? 8 : 10,
            },
          }}
        />
      </div>
    </div>
  );
};
export default CodeEditorWindow;
