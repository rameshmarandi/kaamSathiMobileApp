import Toast from 'react-native-toast-message';

/**
 * Master method to handle toast messages for success, error, info, and warning.
 * @param {('success'|'error'|'info'|'warning')} type - Type of the toast message.
 * @param {string} title - Title of the toast.
 * @param {string} message - Main message of the toast.
 * @param {object} options - Optional customization for the toast like visibility time, position, etc.
 */
const ToastAlertComp = (type, title, message, options = {}) => {
  const defaultOptions = {
    position: 'top', // 'top' | 'bottom'
    autoHide: true, // Auto-hide after a certain time
    visibilityTime: 3000, // Time for toast to stay visible in milliseconds
    topOffset: 30, // Offset from the top for the toast position
    bottomOffset: 40, // Offset from the bottom if the position is 'bottom'
    ...options, // Override any of these options as needed
  };

  // Determine the icon or styling based on the type of toast
  const toastIcon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  Toast.show({
    type: type,
    text1: `${toastIcon[type]} ${title}`, // Adding icon next to the title
    text2: message,
    ...defaultOptions,
  });
};

export default ToastAlertComp;
