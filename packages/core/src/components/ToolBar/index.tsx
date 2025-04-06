import { FC, useEffect, useRef } from "react";
import copyIcon from "@/common/images/copy.svg";
import pasteIcon from "@/common/images/paste.svg";
import { Divider } from "antd";
import cls from "classnames";
import "./index.less";
import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";

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
  onCopy: () => void;
  onParse: () => void;
};

const Menu: FC<IProps> = ({ selectedText, position, onCopy, onParse }) => {
  const inFocus = useFocused();
  const editor = useSlate();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleCopy = () => {
    onCopy();
  };

  const handleParse = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onParse();
  };

  useEffect(() => {
    const { selection } = editor;
    const el = ref.current;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === "" ||
      position.left === 0 ||
      position.top === 0
    ) {
      el.removeAttribute("style");
      return;
    }

    el.style.opacity = "1";
    el.style.left = position.left + "px";
    el.style.top = position.top + 30 + "px";
  });

  return (
    <>
      <div ref={ref} className="tool-bar">
        {/* 复制 */}
        <div
          className={cls("tool-bar-item", {
            disabled: !selectedText,
          })}
          onClick={handleCopy}
        >
          <img className="img" src={copyIcon} />
          <div className="tip">复制</div>
        </div>

        <Divider type="vertical" style={{ backgroundColor: "#999" }} />
        {/* 粘贴 */}
        <div className={cls("tool-bar-item")} onMouseDown={handleParse}>
          <img className="img" src={pasteIcon} />
          <div className="tip">替换</div>
        </div>

        <Divider type="vertical" style={{ backgroundColor: "#999" }} />
      </div>
    </>
  );
};

export default Menu;
