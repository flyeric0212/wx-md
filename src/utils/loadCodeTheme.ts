// 代码主题加载器
import { codeThemeOptions } from '../config/config';

// 当前加载的样式元素ID
let currentThemeId: string | null = null;

/**
 * 加载代码高亮主题
 * @param themeName 主题名称
 */
export const loadCodeTheme = async (themeName: string): Promise<void> => {
  // 移除当前已加载的主题样式
  if (currentThemeId) {
    const currentStyle = document.getElementById(currentThemeId);
    if (currentStyle) {
      document.head.removeChild(currentStyle);
    }
  }

  // 验证主题是否有效
  const isValidTheme = codeThemeOptions.some(theme => theme.value === themeName);
  if (!isValidTheme) {
    console.warn(`主题 "${themeName}" 不存在，使用默认主题`);
    themeName = 'default';
  }

  try {
    // 创建一个新的link元素直接引用CSS文件
    const themeId = `code-theme-${themeName}`;
    const linkElement = document.createElement('link');
    linkElement.id = themeId;
    linkElement.rel = 'stylesheet';
    linkElement.href = `/styles/code/${themeName}.min.css`;

    // 添加到文档头部
    document.head.appendChild(linkElement);

    // 添加额外的样式规则，确保代码高亮正确应用
    const extraStyleId = `code-theme-extra-${themeName}`;
    let extraStyle = document.getElementById(extraStyleId);

    if (!extraStyle) {
      extraStyle = document.createElement('style');
      extraStyle.id = extraStyleId;
      document.head.appendChild(extraStyle);
    }

    // 记录当前主题ID
    currentThemeId = themeId;

    console.log(`代码主题 "${themeName}" 加载成功`);

  } catch (error) {
    console.error(`加载代码主题 "${themeName}" 失败:`, error);
    // 出错时尝试加载默认主题
    if (themeName !== 'default') {
      await loadCodeTheme('default');
    }
  }
};

/**
 * 获取当前加载的主题ID
 * 注意：此函数仅返回当前已加载的主题ID，不从localStorage读取
 * 应该使用useStore中的settings.codeTheme获取当前设置的主题
 */
export const getCurrentLoadedThemeId = (): string | null => {
  return currentThemeId;
};

/**
 * 预加载所有代码主题
 * @deprecated 此功能已被动态加载替代，保留以兼容旧API
 */
export const preloadAllCodeThemes = (): void => {
  console.log('预加载代码主题功能已被替换为动态加载');
};