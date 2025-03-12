import { useCallback } from 'react';
// import juice from 'juice';

/**
 * 处理图片大小，将width/height属性转为style
 */
const solveWeChatImage = (element: HTMLElement) => {
  const images = element.getElementsByTagName('img');
  Array.from(images).forEach((image) => {
    const width = image.getAttribute('width');
    const height = image.getAttribute('height');

    if (width) {
      image.style.width = width;
      image.removeAttribute('width');
    }

    if (height) {
      image.style.height = height;
      image.removeAttribute('height');
    }
  });
};

/**
 * 修改HTML结构，确保列表结构正确
 */
const modifyHtmlStructure = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // 移动 li > ul 和 li > ol 到 li 后面
  tempDiv.querySelectorAll('li > ul, li > ol').forEach((originalItem) => {
    originalItem.parentElement!.insertAdjacentElement('afterend', originalItem);
  });

  return tempDiv.innerHTML;
};

/**
 * 将相对单位(em)转换为绝对单位(px)
 * 解决微信公众号字体大小显示不一致的问题
 * @param element 需要处理的DOM元素
 * @param baseFontSize 基础字体大小（单位：px）
 */
const convertRelativeUnits = (element: HTMLElement, baseFontSize: number = 14) => {
  // 递归处理所有元素
  const processElement = (el: HTMLElement) => {
    // 获取元素的内联样式
    const style = el.getAttribute('style');

    if (style && style.includes('em')) {
      // 使用正则表达式匹配所有em单位的值
      const updatedStyle = style.replace(/([0-9.]+)em/g, (_match, value) => {
        // 将em值转换为px值
        const pxValue = parseFloat(value) * baseFontSize;
        return `${pxValue.toFixed(1)}px`;
      });

      // 更新样式
      el.setAttribute('style', updatedStyle);
    }

    // 递归处理所有子元素
    Array.from(el.children).forEach(child => {
      if (child instanceof HTMLElement) {
        processElement(child);
      }
    });
  };

  // 开始处理
  processElement(element);
};

/**
 * 创建临时可编辑元素并执行复制操作
 */
const executeRichCopy = (html: string): boolean => {
  try {
    // 创建临时容器
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '0';
    tempContainer.style.left = '-9999px';
    tempContainer.setAttribute('contenteditable', 'true');
    document.body.appendChild(tempContainer);

    // 选择内容
    const selection = window.getSelection();
    if (!selection) {
      throw new Error('浏览器不支持selection API');
    }

    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(tempContainer);
    selection.addRange(range);

    // 执行复制命令
    const successful = document.execCommand('copy');

    // 清理
    selection.removeAllRanges();
    document.body.removeChild(tempContainer);

    if (successful) {
      return true;
    } else {
      throw new Error('复制命令执行失败');
    }
  } catch (err) {
    console.error('复制失败:', err);
    alert('复制失败，请重试');
    return false;
  }
};

export function useCopy() {
  // 不再需要获取主题样式字符串
  const copyToWechat = useCallback(() => {
    try {
      console.log('开始执行复制到微信公众号格式');

      // 1. 获取预览区内容
      const previewElement = document.querySelector('.markdown-preview');
      if (!previewElement) {
        console.error('找不到预览区内容');
        alert('找不到预览区内容');
        return false;
      }

      // 2. 直接使用预览区的HTML内容（已经包含内联样式）
      const html = previewElement.innerHTML;

      // 3. 修正HTML结构并处理图片
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = modifyHtmlStructure(html);
      solveWeChatImage(tempDiv);

      // 4. 将相对单位(em)转换为绝对单位(px)
      // 预览基准字体大小为14px，微信公众号基准字体约为17px
      // 这里我们直接将所有em值乘以预览基准字体大小(14px)转为px
      convertRelativeUnits(tempDiv, 14);

      // 5. 执行富文本复制
      return executeRichCopy(tempDiv.innerHTML);
    } catch (error) {
      console.error('处理复制内容时出错:', error);
      alert('复制过程中出错');
      return false;
    }
  }, []);

  return { copyToWechat };
}