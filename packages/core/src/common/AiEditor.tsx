import React from "react";
import { createRoot, Root } from "react-dom/client";
import AISlate from "../components/Editor";

interface AiEditorOptions {
  element: HTMLElement;
  placeholder?: string;
}

class AiEditor {
  private element: HTMLElement;
  private placeholder: string;
  private root: Root | null = null;

  constructor(options: AiEditorOptions) {
    this.element = options.element;
    this.placeholder = options.placeholder || "请输入文本...";
    this.init();
  }

  private init() {
    // 创建React 18 root
    this.root = createRoot(this.element);

    // 渲染编辑器组件，传递placeholder等配置
    this.root.render(
      React.createElement(AISlate, { placeholder: this.placeholder })
    );
  }

  // 提供销毁方法，用于清理React组件
  public destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

export default AiEditor;
