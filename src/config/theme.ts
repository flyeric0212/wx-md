import { toMerged } from 'es-toolkit';
import { ThemeStyles } from '@/types';

// 创建默认主题
const defaultTheme: ThemeStyles = {
  base: {
    lineHeight: '1.6',
  },
  elements: {
    h1: {
      display: 'table',
      padding: '0 1em',
      borderBottom: '2px solid var(--md-theme-color)',
      margin: '2em auto 1em',
      fontSize: '1.3em',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: '1.75',
    },
    h2: {
      display: 'table',
      padding: '0.2em 1em',
      margin: '3em auto 2em',
      color: '#fff',
      background: 'var(--md-theme-color)',
      fontSize: '1.2em',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: '1.75',
    },
    h3: {
      paddingLeft: '8px',
      borderLeft: '3px solid var(--md-theme-color)',
      margin: '2em 8px 0.75em 0',
      fontSize: '1.1em',
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    h4: {
      margin: '2em 8px 0.5em',
      color: 'var(--md-theme-color)',
      fontSize: '1em',
      fontWeight: 'bold',
    },
    h5: {
      margin: '1.5em 8px 0.5em',
      color: 'var(--md-theme-color)',
      fontSize: '1em',
      fontWeight: 'bold',
    },
    h6: {
      margin: '1.5em 8px 0.5em',
      fontSize: '1em',
      color: 'var(--md-theme-color)',
    },
    p: {
      marginTop: '1.5em', // 拆开便于替换首个 p 元素。
      marginRight: '4px',
      marginBottom: '1.5em',
      marginLeft: '4px',
      letterSpacing: '0.1em',
      textAlign: 'justify',
    },
    blockquote: {
      fontStyle: 'normal',
      padding: '1em',
      borderLeft: '4px solid var(--md-theme-color)',
      borderRadius: '6px',
      color: 'rgba(0,0,0,0.5)',
      background: '#f7f7f7',
      marginBottom: '1em',
    },
    blockquote_p: {
      margin: '0',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left'
    },
    code_span: {
      color: '#d14',
      backgroundColor: 'rgba(27,31,35,.05)',
      borderRadius: '4px',
      padding: '0.2em 0.4em',
      fontSize: '0.9em',
      whiteSpace: 'normal',
      fontFamily: 'Menlo, Operator Mono, Consolas, Monaco, monospace',
    },
    pre_code: {
      overflowX: 'auto',
      padding: '0.5em',
      margin: '10px 4px',
      borderRadius: '8px',
      lineHeight: `1.5`,
    },
    code: {
      margin: 0,
      fontFamily: 'Menlo, Operator Mono, Consolas, Monaco, monospace',
      fontSize: '14px',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
      margin: '0.5em auto',
    },
    figcaption: {
      color: '#888',
      fontSize: '0.9em',
      lineHeight: '1.5',
      margin: '0.5em 0',
      textAlign: 'center',
    },
    ul: {
      listStyle: 'disc',
      paddingLeft: '1.2em',
      marginLeft: 0,
    },
    ol: {
      listStyle: 'decimal',
      paddingLeft: '1.2em',
      marginLeft: 0,
    },
    li: {
      textIndent: '0',
      display: 'list-item',
      margin: '0.2em 8px',
      color: 'rgb(0, 0, 0)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: `center`,
      margin: `1em 0`, // 设置左右为 0px，防止右侧被截断
      tableLayout: "fixed",
      wordWrap: "break-word",
      wordBreak: "break-word"
    },
    th: {
      background: '#f2f2f2',
      border: '1px solid #dfdfdf',
      fontWeight: 'bold',
    },
    td: {
      padding: '0.25em 0.5em',
      border: '1px solid #dfdfdf',
      color: `#3f3f3f`,
      // wordBreak: `keep-all`,
      wordBreak: `break-word`,  // 改为break-word更友好
      overflowWrap: `break-word`, // 添加这个属性
      maxWidth: '100%',         // 确保不超出容器
      whiteSpace: 'normal'      // 允许自动换行
    },
    a: {
      color: '#576b95',
      textDecoration: 'none',
    },
    hr: {
      borderStyle: 'solid',
      borderWidth: '2px 0 0',
      borderColor: 'rgba(0,0,0,0.1)',
      height: '0.4em',
      margin: '1.5em 0',
      transformOrigin: '0 0',
      transform: 'scale(1, 0.5)',
    },
    strong: {
      color: 'var(--md-theme-color)',
      fontWeight: 'bold',
      fontSize: 'inherit',
    },
    em: {
      fontStyle: 'italic',
      fontSize: 'inherit',
    },
    footnotes: {
      margin: '0.5em 4px',
      fontSize: '0.9em',
      color: 'var(--md-theme-color)',
    },
  },
};

// 经典主题 - 使用 toMerged 方法合并
const classicTheme: ThemeStyles = toMerged(defaultTheme, {
  base: {},
  elements: {
    h1: {
      lineHeight: '1.75',
    },
  },
});

// 优雅主题 - 使用 toMerged 方法合并
const graceTheme: ThemeStyles = toMerged(defaultTheme, {
  base: {},
  elements: {
    h1: {
      padding: '0.5em 1em',
      fontSize: '1.4em',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      borderBottom: '2px solid var(--md-theme-color)',
    },
    h2: {
      padding: '0.3em 1em',
      borderRadius: '8px',
      fontSize: '1.3em',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    h3: {
      paddingLeft: '12px',
      fontSize: '1.2em',
      borderLeft: '4px solid var(--md-theme-color)',
      borderBottom: '1px dashed var(--md-theme-color)',
    },
    h4: {
      fontSize: '1.1em',
    },
    h5: {
      fontSize: '1em',
    },
    h6: {
      fontSize: '1em',
    },
    blockquote: {
      fontStyle: 'italic',
      padding: '1em 1em 1em 2em',
      borderLeft: '4px solid var(--md-theme-color)',
      borderRadius: '6px',
      color: 'rgba(0,0,0,0.6)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      marginBottom: '1em',
    },
    blockquote_p: {

    },
    img: {
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    ol: {
      paddingLeft: '1.2em',
      listStyle: 'decimal',
    },
    ul: {
      listStyle: 'disc',
      paddingLeft: '1.2em',
    },
    li: {
      margin: '0.5em 8px',
      display: 'list-item',
      textIndent: '0',
    },
    hr: {
      height: '1px',
      border: 'none',
      margin: '2em 0',
      background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))',
    },
    table: {
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    th: {
      color: '#fff',
      background: 'var(--md-theme-color)',
    },
    td: {
      padding: '0.5em 1em',
    },
  },
});

// 简洁主题 - 使用 toMerged 方法合并
const simpleTheme: ThemeStyles = toMerged(defaultTheme, {
  base: {},
  elements: {
    h1: {
      padding: '0.5em 1em',
      fontSize: '1.4em',
      textShadow: '1px 1px 3px rgba(0,0,0,0.05)',
    },
    h2: {
      padding: '0.3em 1.2em',
      fontSize: '1.3em',
      borderRadius: '8px 24px 8px 24px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    },
    h3: {
      paddingLeft: '12px',
      fontSize: '1.2em',
      borderRadius: '6px',
      lineHeight: 2.4,
      borderLeft: '4px solid var(--md-theme-color)',
      borderRight: '1px solid rgba(59, 130, 246, 0.1)',
      borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
      borderTop: '1px solid rgba(59, 130, 246, 0.1)',
      background: 'rgba(59, 130, 246, 0.08)',
    },
    h4: {
      fontSize: '1.1em',
      borderRadius: '6px',
    },
    h5: {
      borderRadius: '6px',
    },
    h6: {
      borderRadius: '6px',
    },
    blockquote: {
      fontStyle: 'italic',
      padding: '1em 1em 1em 2em',
      color: 'rgba(0,0,0,0.6)',
      borderBottom: '0.2px solid rgba(0, 0, 0, 0.04)',
      borderTop: '0.2px solid rgba(0, 0, 0, 0.04)',
      borderRight: '0.2px solid rgba(0, 0, 0, 0.04)',
    },
    blockquote_p: {
      margin: '0',
    },
    code: {
      fontFamily: "'Fira Code', Menlo, Operator Mono, Consolas, Monaco, monospace",
    },
    code_span: {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '3px',
      padding: '0.2em 0.4em',
      fontSize: '0.9em',
      color: '#c7254e',
    },
    pre_code: {
      borderRadius: '6px',
    },
    img: {
      borderRadius: '8px',
      border: '1px solid rgba(0, 0, 0, 0.04)',
    },
    ol: {
      paddingLeft: '1.2em',
      listStyle: 'decimal',
    },
    ul: {
      listStyle: 'disc',
      paddingLeft: '1.2em',
    },
    li: {
      margin: '0.5em 8px',
      display: 'list-item',
      textIndent: '0',
    },
    hr: {
      height: '1px',
      border: 'none',
      margin: '2em 0',
      background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))',
    },
  },
});

// 主题映射
export const themes = {
  default: defaultTheme,
  classic: classicTheme,
  grace: graceTheme,
  simple: simpleTheme,
};

export type ThemeType = keyof typeof themes;

export default defaultTheme;