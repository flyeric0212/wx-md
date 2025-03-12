import React from 'react';

export interface IConfigOption<VT = string> {
    label: string
    value: VT
    desc: string
}

// 预览模式类型
export type PreviewMode = 'responsive' | 'mobile' | 'wide';

// 下拉菜单项类型
export type DropdownItem = {
  label: string;
  action?: () => void;
  subMenu?: DropdownItem[];
  checked?: boolean;
  value?: string;
  url?: string;   // 链接URL，用于跳转类型的菜单项
  isLink?: boolean; // 标识是否为链接类型的菜单项
};

// 主题样式接口
export interface ThemeStyles {
  // 基础变量
  base: React.CSSProperties;

  // Markdown元素样式
  elements: {
    // 标题样式
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    h4?: React.CSSProperties;
    h5?: React.CSSProperties;
    h6?: React.CSSProperties;

    // 段落样式
    p?: React.CSSProperties;

    // 引用样式
    blockquote?: React.CSSProperties;
    blockquote_p?: React.CSSProperties;

    // 代码样式
    code?: React.CSSProperties;
    code_span?: React.CSSProperties;
    pre_code?: React.CSSProperties;

    // 列表样式
    ul?: React.CSSProperties;
    ol?: React.CSSProperties;
    li?: React.CSSProperties;

    // 表格样式
    table?: React.CSSProperties;
    th?: React.CSSProperties;
    td?: React.CSSProperties;

    // 其他元素
    a?: React.CSSProperties;
    img?: React.CSSProperties;
    figcaption?: React.CSSProperties; // 图片标题样式
    hr?: React.CSSProperties;
    strong?: React.CSSProperties;
    em?: React.CSSProperties;
    del?: React.CSSProperties;
    footnotes?: React.CSSProperties;
  }
}