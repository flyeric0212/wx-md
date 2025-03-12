import { useRef, useState, useEffect } from 'react';
import {
  themeOptions,
  fontFamilyOptions,
  fontSizeOptions,
  themeColorOptions,
  codeThemeOptions
} from '../config/config';
import { ThemeType } from '../config/theme';
import { PreviewMode, DropdownItem } from '../types';

/**
 * Toolbar组件属性接口
 */
interface ToolbarProps {
  currentTheme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  codeTheme: string;
  setCodeTheme: (theme: string) => void;
  previewMode: PreviewMode;
  togglePreviewMode: (mode: PreviewMode) => void;
  copyAsWechat: () => void;
}

/**
 * 工具栏组件
 * 提供主题、字体、字号、主题色、代码主题等设置功能
 * 以及预览模式切换和复制为微信公众号格式功能
 */
const Toolbar = ({
  currentTheme,
  setCurrentTheme,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  themeColor,
  setThemeColor,
  codeTheme,
  setCodeTheme,
  previewMode,
  togglePreviewMode,
  copyAsWechat
}: ToolbarProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  /**
   * 处理点击外部关闭下拉菜单
   */
  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const activeButton = document.querySelector(`.dropdown-button[data-menu="${activeDropdown}"]`);
      const activeMenu = document.querySelector(`.dropdown-menu[data-menu="${activeDropdown}"]`);

      const isClickOnActiveButton = activeButton?.contains(target);
      const isClickInActiveMenu = activeMenu?.contains(target);

      if (!isClickOnActiveButton && !isClickInActiveMenu) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  /**
   * 切换下拉菜单的开关状态
   * @param menu 菜单名称
   */
  const handleToggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  /**
   * 处理下拉菜单项点击
   * @param action 点击后执行的操作函数
   */
  const handleMenuItemClick = (action: (() => void) | undefined) => {
    if (action) action();
    setActiveDropdown(null);
  };

  /**
   * 处理链接类型菜单项点击
   * @param url 要跳转的URL
   */
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
    setActiveDropdown(null);
  };

  /**
   * 各种样式操作的配置
   */
  const menuConfigurations = {
    '主题': themeOptions.map(option => ({
      label: option.label,
      action: () => setCurrentTheme(option.value as ThemeType),
      checked: currentTheme === option.value
    })),
    '字体': fontFamilyOptions.map(option => ({
      label: option.label,
      action: () => setFontFamily(option.value),
      checked: fontFamily.replace(/['"]/g, '') === option.value.replace(/['"]/g, '')
    })),
    '字号': fontSizeOptions.map(option => ({
      label: option.label,
      action: () => setFontSize(option.value),
      checked: fontSize === option.value
    })),
    '主题色': themeColorOptions.map(option => ({
      label: option.label,
      value: option.value,
      action: () => setThemeColor(option.value),
      checked: themeColor === option.value
    })),
    '代码主题': codeThemeOptions.map(option => ({
      label: option.label,
      action: () => setCodeTheme(option.value),
      checked: codeTheme === option.value
    })),
    '关于': [
      {
        label: 'GitHub',
        url: 'https://github.com/flyeric0212/wx-md',
        isLink: true
      }
    ]
  };

  /**
   * 渲染下拉菜单
   * @param menuName 菜单名称
   * @param items 菜单项配置
   */
  const renderDropdownMenu = (menuName: string, items: DropdownItem[]) => (
    <div className="dropdown">
      <button
        className={`dropdown-button ${activeDropdown === menuName ? 'active' : ''}`}
        onClick={() => handleToggleDropdown(menuName)}
        data-menu={menuName}
      >
        {menuName}
      </button>
      {activeDropdown === menuName && (
        <div className="dropdown-menu" data-menu={menuName}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`dropdown-item ${item.checked ? 'checked' : ''}`}
              onClick={() => item.isLink && item.url ? handleLinkClick(item.url) : handleMenuItemClick(item.action)}
            >
              {menuName === '主题色' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: item.value,
                    }}
                  ></div>
                  <span>{item.label}</span>
                </div>
              ) : (
                <span>{item.label}</span>
              )}
              {item.checked && <span>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /**
   * 渲染预览模式切换按钮组
   */
  const renderPreviewModeButtons = () => (
    <div className="preview-mode-group">
      <button
        className={`preview-mode-button ${previewMode === 'responsive' ? 'active' : ''}`}
        onClick={() => togglePreviewMode('responsive')}
        title="响应式预览"
      >
        自适应
      </button>
      <button
        className={`preview-mode-button ${previewMode === 'mobile' ? 'active' : ''}`}
        onClick={() => togglePreviewMode('mobile')}
        title="移动设备预览 (375px)"
      >
        手机
      </button>
      <button
        className={`preview-mode-button ${previewMode === 'wide' ? 'active' : ''}`}
        onClick={() => togglePreviewMode('wide')}
        title="宽屏预览 (800px)"
      >
        宽屏
      </button>
    </div>
  );

  return (
    <header className="editor-header" ref={toolbarRef}>
      <div className="toolbar-group">
        {Object.entries(menuConfigurations).map(([menuName, items]) =>
          renderDropdownMenu(menuName, items)
        )}
      </div>

      <div className="toolbar-group">
        {renderPreviewModeButtons()}
        <div className="toolbar-divider"></div>
        <button
          className="copy-button"
          onClick={copyAsWechat}
          title="复制为公众号格式"
        >
          复制
        </button>
      </div>
    </header>
  );
};

export default Toolbar;