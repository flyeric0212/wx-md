import { ThemeType } from './theme';
import { IConfigOption, PreviewMode } from '../types';

// 默认值配置
export const DEFAULT_THEME: ThemeType = 'simple';
export const DEFAULT_THEME_COLOR = '#0F4C81'; // 经典蓝作为默认值
export const DEFAULT_CODE_THEME = 'default';
export const DEFAULT_FONT_FAMILY = '-apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial, sans-serif';
export const DEFAULT_FONT_SIZE = '16px';

// 预览模式类型和默认值
export const DEFAULT_PREVIEW_MODE: PreviewMode = 'responsive';

// 主题选项
export const themeOptions: IConfigOption<ThemeType>[] = [
    { label: '经典', value: 'default', desc: '默认主题，适用于大多数场景' },
    { label: '优雅', value: 'grace', desc: '优雅主题，适合正式场合' },
    { label: '简洁', value: 'simple', desc: '简洁主题，干净利落' }
];

// 字体配置
export const fontFamilyOptions: IConfigOption[] = [
  {
    label: '无衬线',
    value: '-apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial, sans-serif',
    desc: '无衬线字体，现代简洁'
  },
  {
    label: '衬线',
    value: 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif',
    desc: '衬线字体，传统优雅'
  },
  {
    label: '等宽',
    value: 'Menlo, Monaco, Courier New, monospace',
    desc: '等宽字体，适合代码展示'
  },
];

// 字号配置
export const fontSizeOptions: IConfigOption[] = [
  { label: '12px', value: '12px', desc: '极小字号，适合密集信息展示' },
  { label: '13px', value: '13px', desc: '较小字号，适合辅助信息' },
  { label: '14px', value: '14px', desc: '小字号，适合正文内容' },
  { label: '15px', value: '15px', desc: '中小字号，适合一般阅读' },
  { label: '16px', value: '16px', desc: '中等字号，适合长文阅读' },
  { label: '18px', value: '18px', desc: '大字号，适合重要内容' },
];

// 主题色配置
export const themeColorOptions: IConfigOption[] = [
  { label: '经典蓝', value: '#0F4C81', desc: '稳重冷静' },
  { label: '翡翠绿', value: '#009874', desc: '自然平衡' },
  { label: '活力橘', value: '#FA5151', desc: '热情活力' },
  { label: '柠檬黄', value: '#FECE00', desc: '明亮温暖' },
  { label: '薰衣紫', value: '#92617E', desc: '优雅神秘' },
  { label: '天空蓝', value: '#55C9EA', desc: '清爽自由' },
  { label: '玫瑰金', value: '#B76E79', desc: '奢华现代' },
  { label: '橄榄绿', value: '#556B2F', desc: '沉稳自然' },
  { label: '石墨黑', value: '#333333', desc: '内敛极简' },
  { label: '雾烟灰', value: '#A9A9A9', desc: '柔和低调' },
  { label: '樱花粉', value: '#FFB7C5', desc: '浪漫甜美' },
];

// 代码主题配置（对于与 styles/code中的文件）
export const codeThemeOptions: IConfigOption[] = [
  { label: 'default', value: 'default', desc: '默认代码主题' },
  { label: 'dark', value: 'dark', desc: '暗色代码主题' },
  { label: 'github', value: 'github', desc: 'GitHub风格代码主题' },
  { label: 'github-dark', value: 'github-dark', desc: 'GitHub暗色风格代码主题' },
  { label: 'atom-one-light', value: 'atom-one-light', desc: 'Atom编辑器亮色主题' },
  { label: 'atom-one-dark', value: 'atom-one-dark', desc: 'Atom编辑器暗色主题' },
  { label: 'tomorrow-night-blue', value: 'tomorrow-night-blue', desc: 'Tomorrow Night蓝色主题' },
  { label: 'tomorrow-night-bright', value: 'tomorrow-night-bright', desc: 'Tomorrow Night明亮主题' },
  { label: 'vs2015', value: 'vs2015', desc: 'Visual Studio 2015主题' },
  { label: 'xcode', value: 'xcode', desc: 'Xcode编辑器主题' },
  { label: 'googlecode', value: 'googlecode', desc: 'Google Code风格主题' },
];

// 预览模式配置
export const previewModeOptions: IConfigOption<PreviewMode>[] = [
  { label: '响应式', value: 'responsive', desc: '根据屏幕宽度自适应调整' },
  { label: '移动端', value: 'mobile', desc: '模拟移动设备显示效果' },
  { label: '宽屏', value: 'wide', desc: '适合宽屏显示的布局' },
];