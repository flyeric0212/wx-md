import React, { useRef, useMemo, useEffect, useState } from 'react'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { githubLight } from '@uiw/codemirror-theme-github'
import { EditorView } from '@codemirror/view'
// 导入markdown示例文件
import markdownExample from '../assets/example/markdown.md?raw'
// 导入渲染工具函数
import { renderMarkdown } from '../utils/render'
// 导入组件
import Toolbar from '../components/Toolbar'
// 导入主题上下文和工具
import { useTheme, ThemeProvider } from '../contexts/ThemeContext'
// 导入微信公众号格式复制Hook
import { useCopy } from '../hooks/useCopy'
// 导入存储管理Hook
import { useStore } from '../hooks/useStore'
import Notification from '../components/Notification'

/**
 * 包装组件，提供主题上下文
 */
const MarkdownEditorWithTheme: React.FC = () => {
  return (
    <ThemeProvider>
      <MarkdownEditor />
    </ThemeProvider>
  );
};

/**
 * Markdown编辑器主组件
 * 提供编辑、预览和主题设置功能
 *
 * 此组件协调了两个关键模块：
 * 1. ThemeContext - 负责主题的实时应用
 * 2. useStore - 负责状态的持久化存储
 *
 * 当组件初始化时，从useStore加载设置并同步到ThemeContext
 * 当用户更改设置时，通过useStore更新持久化存储，同时通过ThemeContext更新实时主题
 */
const MarkdownEditor: React.FC = () => {
  // DOM引用
  const previewRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<ReactCodeMirrorRef>(null)

  // 使用主题上下文 - 负责主题的实时应用
  const {
    currentTheme,
    setTheme,
    setPrimaryColor,
    getThemeConfig,
    getFontFamily,
    getFontSize,
    setFontFamily,
    setFontSize
  } = useTheme();

  // 使用存储管理Hook - 负责状态的持久化存储
  const {
    content,
    settings,
    isLoaded,
    saveContent,
    updateThemeColor,
    updateCodeTheme,
    updateFontFamily,
    updateFontSize,
    updateTheme,
    updatePreviewMode
  } = useStore();

  // 使用微信公众号格式复制Hook
  const { copyToWechat } = useCopy();

  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success'
  });

  // 初始化时同步主题上下文 - 将持久化的设置同步到ThemeContext
  useEffect(() => {
    if (isLoaded && settings) {
      // 同步主题上下文
      setFontFamily(settings.fontFamily);
      setFontSize(settings.fontSize);
      setPrimaryColor(settings.themeColor);
      setTheme(settings.currentTheme);
    }
  }, [isLoaded, settings, setFontFamily, setFontSize, setPrimaryColor, setTheme]);

  // 只有当content为null或undefined时才使用示例内容，空字符串应该保持为空
  const markdownText = content === null || content === undefined ? markdownExample : content;

  /**
   * 编辑器内容变化处理
   * @param value 新的Markdown文本
   */
  const handleContentChange = (value: string) => {
    saveContent(value);
  }

  /**
   * 复制为微信公众号格式
   */
  const handleCopyToWechat = () => {
    const result = copyToWechat();
    if (result) {
      setNotification({
        visible: true,
        message: '已复制为微信公众号格式，可直接到公众号后台粘贴',
        type: 'success'
      });
    } else {
      setNotification({
        visible: true,
        message: '复制失败，请重试',
        type: 'error'
      });
    }
  }

  /**
   * 关闭通知
   */
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  }

  /**
   * 使用useMemo缓存渲染结果，优化性能
   */
  const renderedMarkdown = useMemo(() => {
    const themeStyles = getThemeConfig();
    const currentFontFamily = getFontFamily();
    const currentFontSize = getFontSize();
    return renderMarkdown(markdownText, themeStyles, currentFontFamily, currentFontSize);
  }, [markdownText, getThemeConfig, getFontFamily, getFontSize]);

  return (
    <div className="editor-container">
      {/* 通知组件 */}
      <Notification
        visible={notification.visible}
        message={notification.message}
        type={notification.type}
        onClose={handleCloseNotification}
      />

      {/* 工具栏 */}
      <Toolbar
        currentTheme={currentTheme}
        setCurrentTheme={updateTheme}
        fontFamily={getFontFamily()}
        setFontFamily={updateFontFamily}
        fontSize={getFontSize()}
        setFontSize={updateFontSize}
        themeColor={settings.themeColor}
        setThemeColor={(color) => {
          // 同时更新store和ThemeContext
          updateThemeColor(color);
          setPrimaryColor(color);
        }}
        codeTheme={settings.codeTheme}
        setCodeTheme={updateCodeTheme}
        previewMode={settings.previewMode || 'responsive'}
        togglePreviewMode={updatePreviewMode}
        copyAsWechat={handleCopyToWechat}
      />

      {/* 主要内容区 */}
      <div className="editor-content">
        {/* 编辑器 */}
        <div className="editor-pane">
          <CodeMirror
            ref={editorRef}
            value={markdownText}
            height="100%"
            theme={githubLight}
            extensions={[
              markdown({
                codeLanguages: languages
              }),
              EditorView.lineWrapping
            ]}
            onChange={handleContentChange}
          />
        </div>

        {/* 预览区 */}
        <div
          id="preview"
          ref={previewRef}
          className="preview-pane"
        >
          <div className={`preview-wrapper ${settings.previewMode === 'mobile' ? 'mobile-preview' : 'wide-preview'}`}>
            <div
              id="output"
              className="markdown-preview"
              dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditorWithTheme