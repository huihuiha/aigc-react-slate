import { useMemo } from "react";
import { Transforms, createEditor, Range, Editor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";

export function useEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

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
    navigator.clipboard
      .readText()
      .then((text) => {
        const { selection } = editor;

        console.log("粘贴板的内容", text);
        if (!selection) return;

        // Transforms.delete(editor, { at: selection });
        Transforms.insertText(editor, text, { at: selection?.focus });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    editor,
    onCopyText,
    onPasteText,
  };
}
