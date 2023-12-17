import { FC, useEffect, useRef } from "react";

import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";
import "./index.less";

type Position = {
  left: number;
  top: number;
  /**
   * 偏差
   */
  offset?: number;
};

type IProps = {
  selectedText: string;
  position: Position;
  show: boolean;
  //   onHandleOperate: (type: EditorOperation, value: any) => void;
  onCopy: () => void;
  onParse: () => void;
};

const ToolBar: FC<IProps> = ({ position, onParse, show }) => {
  const inFocus = useFocused();
  const editor = useSlate();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleParse = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("parse", "ggggggggg");
    onParse();
  };

  useEffect(() => {
    const { selection } = editor;
    const el = ref.current;

    if (!el) {
      return;
    }

    if (
      (!selection ||
        !inFocus ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === "") &&
      !show
    ) {
      el.removeAttribute("style");
      return;
    }

    el.style.opacity = "1";
    el.style.left = position.left + "px";
    el.style.top = position.top + 30 + "px";
  });

  return (
    <div ref={ref} className="tool-bar">
      <div className="tool-bar-item" onMouseDown={handleParse}>
        <div className="tip">粘贴</div>
      </div>
    </div>
  );
};

export default ToolBar;
