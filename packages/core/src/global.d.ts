declare module "*.png" {
  const value: string;
  export = value;
}
declare module "*.jpg" {
  const value: string;
  export = value;
}

declare module "*.svg" {
  const value: string;
  export = value;
}

// 添加 .less 文件的声明
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
