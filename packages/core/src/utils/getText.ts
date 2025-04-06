import { Editor, BaseEditor } from "slate";

/**
 * 获取选中的文本内容
 */
export const getSelectedText = (editor: BaseEditor) => {
  const { selection } = editor;
  if (!selection) return;
  const fragment = Editor.fragment(editor, selection);

  let content: string = "";

  for (const paragraph of fragment) {
    const _paragraph: any = paragraph;

    for (const node of _paragraph.children) {
      const _node = node;
      content += parseNodeToText(_node);
    }

    content += "\n";
  }

  content = content.replace(/\n$/, "");

  return content;
};

/**
 * 解析一些自定义的元素变成文本
 */
export const parseNodeToText = (node: any) => {
  let content = "";
  switch (node.type) {
    // TODO: 解析文本内容
    default:
      content += node.text;
      break;
  }
  return content;
};
