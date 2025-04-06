import { Editable, Slate } from "slate-react";
import { useEditor } from "@/hooks/useEditor";

import ToolBar from "@/components/ToolBar";

import { EDITOR_INITIAL_VALUE } from "@/common/constant";
import { useState } from "react";
import "./index.less";

const AISlate = () => {
  const { editor, onPasteText, onGetSelectedMsg } = useEditor();

  const [selectedText, setSelectedText] = useState<string>("");

  const [toolBarPosition, setToolBarPosition] = useState({
    left: 0,
    top: 0,
  });

  const onInputChange = (value: any) => {
    console.log(value);
  };

  const handleParse = () => {
    console.log("parse");
    onPasteText();
  };

  const handleSelect = () => {
    const { text = "", left = 0, top = 0 } = onGetSelectedMsg();

    console.log("选中的文本", text);
    // 控制智能工具的出现
    setSelectedText(text);
    setToolBarPosition({
      left,
      top,
    });
  };

  return (
    <div className="editor-wrap">
      <Slate
        editor={editor}
        initialValue={EDITOR_INITIAL_VALUE}
        onChange={onInputChange}
      >
        <ToolBar
          onParse={handleParse}
          selectedText={selectedText}
          position={{
            left: toolBarPosition.left,
            top: toolBarPosition.top,
            offset: 10,
          }}
          onCopy={() => {}}
        />
        <Editable
          placeholder="请输入文本驱动虚拟人..."
          style={{
            height: "100%",
            border: "none",
            outline: "none",
            overflow: "scroll",
          }}
          onMouseUp={handleSelect}
        />
      </Slate>
    </div>
  );
};

export default AISlate;
