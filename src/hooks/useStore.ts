import { useState, useEffect, useCallback } from 'react';
import { ThemeType } from '../config/theme';
import { loadCodeTheme } from '../utils/loadCodeTheme';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_THEME,
  DEFAULT_THEME_COLOR,
  DEFAULT_CODE_THEME,
  DEFAULT_PREVIEW_MODE,
  themeOptions
} from '../config/config';
import { PreviewMode } from '../types';

// 本地存储键名
const STORAGE_KEYS = {
  CONTENT: 'markdown-content',
  SETTINGS: 'markdown-settings'
};

// 设置类型定义
interface EditorSettings {
  fontFamily: string;
  fontSize: string;
  themeColor: string;
  codeTheme: string;
  currentTheme: ThemeType;
  previewMode?: PreviewMode;
}

/**
 * Markdown编辑器存储管理Hook
 * 集中管理编辑器内容和设置的本地存储逻辑
 *
 * 注意：useStore负责状态的持久化存储
 * 而ThemeContext负责主题的实时应用
 *
 * 在MarkdownEditor组件中，这两个模块协同工作：
 * 1. 从useStore加载持久化的设置
 * 2. 将这些设置同步到ThemeContext
 * 3. 当用户更改设置时，通过useStore更新持久化存储
 * 4. 同时通过ThemeContext更新实时主题
 *
 * 这种设计模式实现了关注点分离，使得主题逻辑和存储逻辑解耦
 */
export function useStore() {
  // 编辑器内容状态
  const [content, setContent] = useState<string | null>(null);

  // 编辑器设置状态
  const [settings, setSettings] = useState<EditorSettings>({
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    themeColor: DEFAULT_THEME_COLOR,
    codeTheme: DEFAULT_CODE_THEME,
    currentTheme: DEFAULT_THEME,
    previewMode: DEFAULT_PREVIEW_MODE
  });

  // 加载状态
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  /**
   * 从本地存储加载内容
   */
  const loadContent = useCallback(() => {
    try {
      const savedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (savedContent) {
        setContent(savedContent);
        return savedContent;
      }
      setContent(null);
      return null;
    } catch (error) {
      console.error('加载内容失败:', error);
      setContent(null);
      return null;
    }
  }, []);

  /**
   * 保存内容到本地存储
   */
  const saveContent = useCallback((newContent: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENT, newContent);
      setContent(newContent);
    } catch (error) {
      console.error('保存内容失败:', error);
    }
  }, []);

  /**
   * 从本地存储加载设置
   */
  const loadSettings = useCallback(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);

        // 验证主题是否有效
        if (parsedSettings.currentTheme) {
          const isValidTheme = themeOptions.some(
            opt => opt.value === parsedSettings.currentTheme
          );
          if (!isValidTheme) {
            parsedSettings.currentTheme = 'default';
          }
        }

        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));

        // 加载代码主题
        if (parsedSettings.codeTheme) {
          loadCodeTheme(parsedSettings.codeTheme).catch(err => {
            console.error('加载代码主题失败:', err);
          });
        } else {
          loadCodeTheme(DEFAULT_CODE_THEME).catch(err => {
            console.error('加载默认代码主题失败:', err);
          });
        }

        return parsedSettings;
      }

      // 没有保存的设置时加载默认主题
      loadCodeTheme(DEFAULT_CODE_THEME).catch(err => {
        console.error('加载默认代码主题失败:', err);
      });

      return null;
    } catch (error) {
      console.error('加载设置失败:', error);

      // 出错时加载默认主题
      loadCodeTheme(DEFAULT_CODE_THEME).catch(err => {
        console.error('加载默认代码主题失败:', err);
      });

      return null;
    }
  }, []);

  /**
   * 保存设置到本地存储
   */
  const saveSettings = useCallback((newSettings: Partial<EditorSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
      setSettings(updatedSettings);

      // 如果更新了代码主题，则加载新主题
      if (newSettings.codeTheme && newSettings.codeTheme !== settings.codeTheme) {
        loadCodeTheme(newSettings.codeTheme).catch(err => {
          console.error(`加载代码主题 "${newSettings.codeTheme}" 失败:`, err);
        });
      }

      return true;
    } catch (error) {
      console.error('保存设置失败:', error);
      return false;
    }
  }, [settings]);

  /**
   * 更新主题颜色
   * 注意：此方法只负责持久化存储，实际应用主题颜色由ThemeContext处理
   */
  const updateThemeColor = useCallback((color: string) => {
    saveSettings({ themeColor: color });
  }, [saveSettings]);

  /**
   * 更新代码主题
   */
  const updateCodeTheme = useCallback((theme: string) => {
    saveSettings({ codeTheme: theme });
  }, [saveSettings]);

  /**
   * 更新字体
   * 注意：此方法只负责持久化存储，实际应用字体由ThemeContext处理
   */
  const updateFontFamily = useCallback((fontFamily: string) => {
    saveSettings({ fontFamily });
  }, [saveSettings]);

  /**
   * 更新字号
   * 注意：此方法只负责持久化存储，实际应用字号由ThemeContext处理
   */
  const updateFontSize = useCallback((fontSize: string) => {
    saveSettings({ fontSize });
  }, [saveSettings]);

  /**
   * 更新主题
   * 注意：此方法只负责持久化存储，实际应用主题由ThemeContext处理
   */
  const updateTheme = useCallback((theme: ThemeType) => {
    saveSettings({ currentTheme: theme });
  }, [saveSettings]);

  /**
   * 更新预览模式
   */
  const updatePreviewMode = useCallback((mode: PreviewMode) => {
    saveSettings({ previewMode: mode });
  }, [saveSettings]);

  /**
   * 初始化时加载内容和设置
   */
  useEffect(() => {
    loadContent();
    loadSettings();
    setIsLoaded(true);
  }, [loadContent, loadSettings]);

  return {
    // 状态
    content,
    settings,
    isLoaded,

    // 内容管理
    loadContent,
    saveContent,

    // 设置管理
    loadSettings,
    saveSettings,

    // 便捷更新方法
    updateThemeColor,
    updateCodeTheme,
    updateFontFamily,
    updateFontSize,
    updateTheme,
    updatePreviewMode
  };
}