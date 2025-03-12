import React, { createContext, useState, useContext, useCallback, useRef } from 'react';
import { themes, ThemeType } from '../config/theme';
import { DEFAULT_THEME, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '../config/config';
import { ThemeStyles } from '../types';

/**
 * 主题上下文类型接口
 * 定义了主题相关的状态和方法
 *
 * 设计理念：
 * 1. ThemeContext 负责主题的状态管理，持久化存储由 useStore hook 负责
 * 2. 所有样式通过内联样式应用到预览区，确保预览效果与微信公众号显示一致
 */
interface ThemeContextType {
  // 当前主题
  currentTheme: ThemeType;
  // 设置主题
  setTheme: (theme: ThemeType) => void;
  // 获取主题样式对象
  getThemeConfig: () => ThemeStyles;
  // 获取当前字体
  getFontFamily: () => string;
  // 获取当前字号
  getFontSize: () => string;
  // 设置字体
  setFontFamily: (fontFamily: string) => void;
  // 设置字号
  setFontSize: (fontSize: string) => void;
  // 设置主题主色调
  setPrimaryColor: (color: string) => void;
}

/**
 * 创建主题上下文
 * 提供默认值以避免在使用前未初始化的情况
 */
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: DEFAULT_THEME,
  setTheme: () => {},
  getThemeConfig: () => themes.default,
  getFontFamily: () => DEFAULT_FONT_FAMILY,
  getFontSize: () => DEFAULT_FONT_SIZE,
  setFontFamily: () => {},
  setFontSize: () => {},
  setPrimaryColor: () => {},
});

/**
 * 主题提供者组件
 * 管理主题状态并提供给子组件
 *
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 使用useRef跟踪主题变化，避免不必要的重渲染
  const themeRef = useRef<ThemeType>(DEFAULT_THEME);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(DEFAULT_THEME);

  // 跟踪当前的主题色
  const [primaryColor, setPrimaryColor] = useState<string>('');

  // 字体和字号设置
  const [fontFamily, setFontFamily] = useState<string>(DEFAULT_FONT_FAMILY);
  const [fontSize, setFontSize] = useState<string>(DEFAULT_FONT_SIZE);

  /**
   * 设置主题的主色调
   * @param color 颜色值（如 #FF0000）
   */
  const handleSetPrimaryColor = useCallback((color: string) => {
    if (color && color !== primaryColor) {
      setPrimaryColor(color);
      // 更新根元素CSS变量，用于全局样式
      document.documentElement.style.setProperty('--md-theme-color', color);
    }
  }, [primaryColor]);

  /**
   * 获取当前完整主题配置，包含已处理的变量
   * @returns {ThemeStyles} 处理后的主题样式对象
   */
  const getThemeConfig = useCallback((): ThemeStyles => {
    // 获取基本主题配置 - 使用currentTheme而非themeRef.current
    const currentThemeConfig = themes[currentTheme];

    // 深拷贝避免修改原始对象
    const themeConfig: ThemeStyles = JSON.parse(JSON.stringify(currentThemeConfig));

    // 使用外部传入的主题色，默认使用蓝色
    const mdPrimaryColor = primaryColor || '#0F4C81';

    // 一次性替换所有变量引用和单位转换
    const processThemeVariables = (obj: Record<string, unknown>) => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          // 1. 处理主题颜色变量
          if (value.includes('var(--md-theme-color)')) {
            obj[key] = value.replace(/var\(--md-theme-color\)/g, mdPrimaryColor);
          }

          // 2. 处理em单位 - 转换为px单位，这样在微信中显示就会正确
          if (value.includes('em') && (key === 'fontSize' || key.toLowerCase().includes('size'))) {
            const emMatch = value.match(/([0-9.]+)em/);
            if (emMatch) {
              const emValue = parseFloat(emMatch[1]);
              // 计算px值并保留一位小数
              const pxValue = (emValue * parseInt(fontSize.replace('px', ''), 10)).toFixed(1);
              obj[key] = value.replace(/([0-9.]+)em/, `${pxValue}px`);
            }
          }
        } else if (typeof value === 'object' && value !== null) {
          processThemeVariables(value as Record<string, unknown>);
        }
      }
    };

    // 处理所有元素样式
    processThemeVariables(themeConfig.elements);

    // 处理基础样式变量
    processThemeVariables(themeConfig.base as unknown as Record<string, unknown>);

    return themeConfig;
  }, [primaryColor, currentTheme, fontSize]);

  /**
   * 安全地设置主题，避免循环更新
   * @param theme 主题类型
   */
  const handleSetTheme = useCallback((theme: ThemeType) => {
    if (theme !== currentTheme) {
      // 先更新引用，再更新状态，保证一致性
      themeRef.current = theme;
      setCurrentTheme(theme);

      // 无需在切换主题时更新主题色，完全依赖外部传入的primaryColor
      // 主题色的控制权完全交给外部组件
    }
  }, [currentTheme]);

  // 提供上下文值
  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: handleSetTheme,
        getThemeConfig,
        getFontFamily: useCallback(() => fontFamily, [fontFamily]),
        getFontSize: useCallback(() => fontSize, [fontSize]),
        setFontFamily: useCallback((newFontFamily: string) => setFontFamily(newFontFamily), []),
        setFontSize: useCallback((newFontSize: string) => setFontSize(newFontSize), []),
        setPrimaryColor: handleSetPrimaryColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 使用主题的自定义Hook
 * @returns {ThemeContextType} 主题上下文
 */
export const useTheme = () => useContext(ThemeContext);