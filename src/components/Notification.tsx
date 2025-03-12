import { useEffect } from 'react';
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

/**
 * 通知组件
 * 显示成功或错误消息，2秒后自动消失
 */
const Notification: React.FC<NotificationProps> = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      // 2秒后自动关闭
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;