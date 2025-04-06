import { useEditor } from "@/hooks/useEditor";
import { useState } from "react";
import "./index.less";

interface AISlateProps {
  placeholder?: string;
}

/**
 * AISlate 编辑器组件
 */
const AISlate = ({ placeholder = "请输入文本驱动虚拟人..." }: AISlateProps) => {
  const { onPasteText, onGetSelectedMsg } = useEditor();

  const [selectedText, setSelectedText] = useState<string>("");
  const [toolBarPosition, setToolBarPosition] = useState({
    left: 0,
    top: 0,
  });

  // 处理选择文本事件
  const handleSelect = () => {
    const { text = "", left = 0, top = 0 } = onGetSelectedMsg();
    // 控制智能工具的出现
    setSelectedText(text);
    setToolBarPosition({
      left,
      top,
    });
  };

  return (
    <div className="editor-container">
      <div className="editor-content">{placeholder}</div>
    </div>
  );
};

export default AISlate;
