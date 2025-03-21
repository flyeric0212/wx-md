/**
 * Markdown 渲染工具
 * 提供完整的 Markdown 渲染能力，支持主题定制、代码高亮和自定义样式
 */
import {marked} from 'marked'
import type {Renderer, RendererObject} from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'
import {ThemeStyles} from '../types'

// ------------------------------------
// 常量定义
// ------------------------------------

/**
 * Mac风格代码窗口SVG图标
 */
const MAC_CODE_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="45px" height="13px" viewBox="0 0 450 130">
    <ellipse cx="50" cy="65" rx="50" ry="52" stroke="rgb(220,60,54)" stroke-width="2" fill="rgb(237,108,96)" />
    <ellipse cx="225" cy="65" rx="50" ry="52" stroke="rgb(218,151,33)" stroke-width="2" fill="rgb(247,193,81)" />
    <ellipse cx="400" cy="65" rx="50" ry="52" stroke="rgb(27,161,37)" stroke-width="2" fill="rgb(100,200,86)" />
  </svg>
`.trim()

// ------------------------------------
// 类型定义
// ------------------------------------

/**
 * 元素配置接口
 */
interface ElementConfig {
  styleKey: string;                 // 样式键名
  content: string;                  // 内容
  tagName?: string;                 // 标签名（可选，如果未提供则使用styleKey）
  themeStyles?: ThemeStyles;        // 主题样式
  baseStyles?: string;              // 基础样式
  attributes?: Record<string, string | undefined>; // HTML属性
}

/**
 * 引用链接接口
 */
interface FootnoteLink {
  href: string;
  title?: string | null;
  text: string;
}

/**
 * 渲染器返回接口
 */
interface RendererResult {
  renderer: Renderer;
  footnotes: FootnoteLink[];
  generateFootnotesHtml: () => string;
}

// ------------------------------------
// 样式处理函数
// ------------------------------------

/**
 * 构建CSS样式字符串
 * @param themeStyles 主题样式配置
 * @param styleKey 样式键名
 * @param baseStyles 基础样式
 * @returns 样式字符串
 */
const buildStyleString = (
  themeStyles?: ThemeStyles,
  styleKey?: string,
  baseStyles: string = ''
): string => {
  // 如果没有特定元素的样式，直接返回基础样式
  if (!themeStyles?.elements || !styleKey || !(styleKey in themeStyles.elements)) {
    return baseStyles;
  }

  // 获取元素样式
  const elementStyle = themeStyles.elements[styleKey as keyof ThemeStyles['elements']];

  // 解析基础样式，转换为对象
  const stylesObj: Record<string, string> = {};
  if (baseStyles) {
    // 分割样式字符串为单独的属性
    const styleProps = baseStyles.split(';').filter(prop => prop.trim());
    for (const prop of styleProps) {
      const [key, value] = prop.split(':').map(part => part.trim());
      if (key && value) {
        stylesObj[key] = value;
      }
    }
  }

  // 处理元素特定样式，并覆盖基础样式中的相同属性
  if (elementStyle) {
    for (const [key, value] of Object.entries(elementStyle)) {
      if (value !== undefined && value !== null) {
        // 转换驼峰命名为连字符命名
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        // 更新或添加到样式对象
        stylesObj[cssKey] = String(value);
      }
    }
  }

  // 将样式对象转换回字符串
  let finalStyleStr = '';
  for (const [key, value] of Object.entries(stylesObj)) {
    finalStyleStr += `${key}: ${value}; `;
  }

  return finalStyleStr;
};

/**
 * 创建带样式的HTML元素
 * @param config 元素配置对象
 * @returns HTML字符串
 */
const createStyledElement = (config: ElementConfig): string => {
  const {
    styleKey,
    content,
    tagName = styleKey,  // 默认使用styleKey作为tagName
    themeStyles,
    baseStyles = '',
    attributes = {},
  } = config;

  // 构建样式字符串
  const styles = buildStyleString(themeStyles, styleKey, baseStyles);

  // 构建属性字符串
  const attrsStr = Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('');

  // 构建带样式的标签
  return styles
    ? `<${tagName}${attrsStr} style="${styles}">${content}</${tagName}>`
    : `<${tagName}${attrsStr}>${content}</${tagName}>`;
};

/**
 * 构建基础样式字符串
 * @param themeStyles 主题样式
 * @param fontFamily 字体
 * @param fontSize 字号
 * @returns 基础样式字符串
 */
const createBaseStyles = (
  themeStyles?: ThemeStyles,
  fontFamily?: string,
  fontSize?: string
): string => {
  let baseStyles = '';

  // 添加 fontFamily 和 fontSize
  if (fontFamily || fontSize) {
    baseStyles += `font-family:${fontFamily || 'inherit'};font-size:${fontSize || 'inherit'};`;
  }

  // 添加 themeStyles.base 中的样式
  if (themeStyles?.base) {
    for (const [key, value] of Object.entries(themeStyles.base)) {
      if (value !== undefined && value !== null) {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        baseStyles += `${cssKey}: ${String(value)}; `;
      }
    }
  }

  return baseStyles;
};

// ------------------------------------
// 脚注处理函数
// ------------------------------------

/**
 * 构建脚注HTML数组内容
 * @param footnotes 脚注链接数组
 * @returns 脚注HTML字符串
 */
const generateFootnoteContent = (footnotes: FootnoteLink[]): string => {
  return footnotes.map((link, index) => {
    // 如果链接文本与URL相同，使用简化形式
    if (link.text === link.href) {
      return `<code style="font-size: 90%; opacity: 0.6;">[${index + 1}]</code>: <i style="word-break: break-all">${link.href}</i>`;
    } else {
      // 否则显示文本和链接
      return `<code style="font-size: 90%; opacity: 0.6;">[${index + 1}]</code> ${link.text}: <i style="word-break: break-all">${link.href}${link.title ? ` "${link.title}"` : ''}</i>`;
    }
  }).join('<br>\n');  // 使用\n增加可读性
};

// ------------------------------------
// 核心渲染函数
// ------------------------------------

/**
 * 创建Markdown渲染器
 * @param themeStyles 主题样式
 * @param baseStyles 基础样式
 * @returns RendererResult 包含渲染器、脚注和生成脚注HTML的方法
 */
export const createMarkdownRenderer = (
  themeStyles?: ThemeStyles,
  baseStyles: string = ''
): RendererResult => {
  // 存储引用链接
  const footnotes: FootnoteLink[] = [];

  // 创建一个辅助函数，简化重复参数传递
  const createElement = (config: Omit<ElementConfig, 'themeStyles' | 'baseStyles'>): string => {
    return createStyledElement({
      ...config,
      themeStyles,
      baseStyles
    });
  };

  /**
   * 生成脚注HTML
   * @returns 脚注HTML字符串
   */
  const generateFootnotesHtml = (): string => {
    if (!footnotes.length) {
      return '';
    }

    // 创建标题和脚注内容
    const heading = createElement({
      styleKey: 'h4',
      content: '引用链接'
    });

    const content = createElement({
      styleKey: 'footnotes',
      content: generateFootnoteContent(footnotes),
      tagName: 'p'
    });

    return heading + content;
  };

  // 构建Markdown渲染器
  const renderer: RendererObject = {
    // 文本
    text(text) {
      return text;
    },

    // HTML
    html(html) {
      return html;
    },

    // 段落
    paragraph(text) {
      return createElement({
        styleKey: 'p',
        content: text
      });
    },

    // 标题
    heading(text, level) {
      const headingKey = `h${level}`;
      return createElement({
        styleKey: headingKey,
        content: text
      });
    },

    // 引用块
    blockquote(quote) {
      let processedQuote = quote;

      // 处理引用块中的段落样式
      if (themeStyles?.elements?.blockquote_p) {
        const blockquotePStyle = buildStyleString(themeStyles, 'blockquote_p', '');

        // 处理已有style属性的p标签
        processedQuote = processedQuote.replace(/<p\s+style="([^"]*)"/g,
          (_, styleValue) => `<p style="${styleValue};${blockquotePStyle}"`);

        // 处理没有style属性的p标签
        processedQuote = processedQuote.replace(/<p(?!\s+style=)(\s+[^>]*)?>/g,
          (_, attrs) => `<p${attrs || ''} style="${blockquotePStyle}">`);
      }

      return createElement({
        styleKey: 'blockquote',
        content: processedQuote
      });
    },

    // 列表
    list(body, ordered) {
      const styleKey = ordered ? 'ol' : 'ul';
      return createElement({
        styleKey: styleKey,
        content: body
      });
    },

    // 列表项
    listitem(text) {
      // 检查是否包含格式化元素
      const hasFormatting = /<(strong|em|del|s|code)/.test(text);

      // 微信公众号对p标签支持较好，使用p标签包裹内容
      if (hasFormatting) {
        return createElement({
          styleKey: 'li',
          content: `<p style="margin:0;padding:0;">${text}</p>`
        });
      }

      return createElement({
        styleKey: 'li',
        content: text
      });
    },

    // 链接
    link(href, title, text) {
      // 微信公众号链接特殊处理，保留可点击功能
      if (href.startsWith('https://mp.weixin.qq.com')) {
        return createElement({
          styleKey: 'wx_link',
          content: text,
          tagName: 'a',
          attributes: {
            href,
            title: title || text,
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        });
      }

      // 非微信链接处理为引用格式
      // 添加到引用链接数组
      const footnoteIndex = footnotes.push({href, title, text});

      // 返回带引用索引的文本，数字使用上标显示
      return createElement({
        styleKey: 'a',
        tagName: 'span',
        content: `${text} <sup>[${footnoteIndex}]</sup>`,
        attributes: {
          'data-index': String(footnoteIndex)
        }
      });
    },

    // 图片
    image(href, title, text) {
      // 图片属性
      const imgAttributes: Record<string, string> = {
        src: href,
        alt: text
      };

      if (title) {
        imgAttributes.title = title;
      }

      return createElement({
        styleKey: 'img',
        content: '',
        tagName: 'img',
        attributes: imgAttributes
      });
    },

    // 表格
    table(header, body) {
      return createElement({
        styleKey: 'table',
        content: `<thead>${header}</thead><tbody>${body}</tbody>`
      });
    },

    // 表格行
    tablerow(content) {
      return createElement({
        styleKey: 'tr',
        content
      });
    },

    // 表格单元格
    tablecell(content, flags) {
      const isHeader = flags && flags.header;
      return createElement({
        styleKey: isHeader ? 'th' : 'td',
        content,
        tagName: isHeader ? 'th' : 'td'
      });
    },

    // 加粗
    strong(text) {
      return createElement({
        styleKey: 'strong',
        content: text
      });
    },

    // 斜体
    em(text) {
      return createElement({
        styleKey: 'em',
        content: text
      });
    },

    // 分割线
    hr() {
      return createElement({
        styleKey: 'hr',
        content: '',
        tagName: 'hr'
      });
    },

    // 删除线
    del(text) {
      return createElement({
        styleKey: 'del',
        content: text
      });
    },

    // 换行
    br() {
      return '<br>';
    },

    // 行内代码
    codespan(code) {
      return createElement({
        styleKey: 'code_span',
        content: code,
        tagName: 'code'
      });
    },

    // 代码块
    code(code, language) {
      const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext';

      // 高亮代码
      let highlightedCode = hljs.highlight(code, {
        language: validLanguage,
        ignoreIllegals: true
      }).value;

      // 格式化处理
      highlightedCode = highlightedCode.replace(/\t/g, '    ');
      highlightedCode = highlightedCode
        .replace(/\r\n/g, '<br/>')
        .replace(/\n/g, '<br/>')
        .replace(/(>[^<]+)|(^[^<]+)/g, str => str.replace(/\s/g, '&nbsp;'));

      // 创建代码内容
      const preContent = createElement({
        styleKey: 'code',
        content: highlightedCode,
        tagName: 'code',
        attributes: {class: `language-${validLanguage}`}
      });

      // 添加Mac风格按钮
      const macIconSpan = `<span class="mac-sign" style="padding:4px;display:flex;">${MAC_CODE_SVG}</span>`;

      // 返回完整代码块
      return createElement({
        styleKey: 'pre_code',
        content: macIconSpan + preContent,
        tagName: 'pre',
        attributes: {class: 'hljs'}
      });
    }
  };

  return {
    renderer: renderer as Renderer,
    footnotes,
    generateFootnotesHtml
  };
};

/**
 * 渲染Markdown为HTML (主入口函数)
 * @param markdownText Markdown文本
 * @param themeStyles 主题样式
 * @param fontFamily 字体
 * @param fontSize 字号
 * @returns 渲染后的HTML
 */
export const renderMarkdown = (
  markdownText: string,
  themeStyles?: ThemeStyles,
  fontFamily?: string,
  fontSize?: string
): string => {
  // 创建基础样式
  const baseStyles = createBaseStyles(themeStyles, fontFamily, fontSize);

  // 获取渲染器和脚注处理器
  const { renderer, generateFootnotesHtml } = createMarkdownRenderer(themeStyles, baseStyles);

  // 配置渲染器
  marked.use({ renderer });

  // 渲染Markdown
  const rawHtml = marked.parse(markdownText) as string;

  // 获取脚注HTML
  const footnotesHtml = generateFootnotesHtml();

  // 组合HTML内容
  const combinedHtml = rawHtml + footnotesHtml;

  // 处理首段落的margin
  const modifiedHtml = adjustFirstParagraphMargin(combinedHtml);

  // 净化HTML并返回
  return sanitizeHtml(modifiedHtml);
};

/**
 * 调整首段落的margin
 * @param html HTML内容
 * @returns 调整后的HTML
 */
const adjustFirstParagraphMargin = (html: string): string => {
  return html.replace(
    /(<p\s+style=["'])([^"']*)["']/i,
    (_match, start, styles) => {
      // 移除已有的margin-top属性
      const cleanedStyles = styles.replace(/margin-top:\s*[^;]+;?/i, '');
      // 添加margin-top: 0
      return `${start}margin-top: 0; ${cleanedStyles}"`;
    }
  );
};

/**
 * 净化HTML，防止XSS攻击
 * @param html 原始HTML
 * @returns 净化后的HTML
 */
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['use'], // 允许SVG use标签
    ADD_ATTR: ['href', 'xlink:href', 'class', 'style', 'data-index'] // 允许SVG链接属性等
  });
};

/**
 * 初始化Marked配置
 */
export const initMarked = (): void => {
  marked.setOptions({
    breaks: false,  // 禁用自动换行转换
    gfm: true       // 启用GitHub风格Markdown
  });
};

/**
 * HTML特殊字符转义
 * @param text 需要转义的文本
 * @returns 转义后的文本
 */
export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// 初始化Marked (只需要调用一次)
initMarked();