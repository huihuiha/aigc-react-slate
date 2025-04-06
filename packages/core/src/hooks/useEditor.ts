import { getSelectedText } from "@/utils";
import { useMemo } from "react";
import { Transforms, createEditor, Range, Editor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";

export function useEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  /**
   * 获取选中的文本信息
   */
  const onGetSelectedMsg = () => {
    const { selection } = editor;
    if (selection && !Range.isCollapsed(selection)) {
      const range = Editor.range(editor, selection as Range);
      const { left, top } = window
        .getSelection()!
        .getRangeAt(0)
        .getBoundingClientRect();
      if (!range) return { text: "" };

      const selectedText = getSelectedText(editor);

      return {
        text: selectedText,
        left: left,
        top: top,
      };
    }
    return {
      text: "",
    };
  };

  /**
   * 复制
   */
  const onCopyText = () => {
    const { selection } = editor;
    if (selection && Range.isExpanded(selection)) {
      const selectedText = Editor.string(editor, selection);
      navigator.clipboard.writeText(selectedText);
    }
  };

  /**
   * 粘贴
   */
  const onPasteText = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const text = await navigator.clipboard.readText();
        const { selection } = editor;

        if (!selection) return;

        Transforms.delete(editor, { at: selection });
        Transforms.insertText(editor, text, { at: selection?.focus });
        resolve(text);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    editor,
    onCopyText,
    onPasteText,
    onGetSelectedMsg,
  };
}
