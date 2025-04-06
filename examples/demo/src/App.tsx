import { useRef, useEffect } from "react";
import { AiEditor } from "@ssml-slate/core";

function App() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const editor = new AiEditor({
      element: divRef.current,
      placeholder: "点击输入内容...",
    });

    return () => {
      console.log("卸载");
      editor.destroy();
    };
  }, []);

  return (
    <>
      <div
        ref={divRef}
        style={{ width: "100%", height: "500px", border: "1px solid #ddd" }}
      ></div>
    </>
  );
}

export default App;
