import { Editable, Slate } from "slate-react";
import { useEditor } from "../../hooks/useEditor";

import ToolBar from "../ToolBar";

import { EDITOR_INITIAL_VALUE } from "@/common/constant";
import { useState } from "react";

const AISlate = () => {
  const { editor, onPasteText } = useEditor();

  const onInputChange = (value: any) => {
    console.log(value);
  };

  const [show, setShow] = useState<boolean>(false);

  const handleParse = () => {
    console.log("parse");
    onPasteText();
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    console.log("context menu");
    setShow(true);
  };

  return (
    <Slate
      editor={editor}
      initialValue={EDITOR_INITIAL_VALUE}
      onChange={onInputChange}
    >
      <ToolBar
        show={show}
        onParse={handleParse}
        selectedText={""}
        position={{
          left: 0,
          top: 0,
          offset: undefined,
        }}
        onCopy={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Editable
        placeholder="请输入文本驱动虚拟人..."
        style={{
          height: "100%",
          border: "none",
          outline: "none",
          overflow: "scroll",
        }}
        onContextMenu={handleContextMenu}
      />
    </Slate>
  );
};

export default AISlate;
