import Toast from 'react-native-toast-message';

export const notifySuccess = (
    message,
    options = {}
) => {
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
        position: options.position || 'bottom',
        topOffset: options.topOffset || 40,
        ...options,
    });
};

export const notifyError = (
    message,
    options = {}
) => {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: options.position || 'bottom',
        topOffset: options.topOffset || 40,
        ...options,
    });
};

/**
 * Generic
 */
export const notify = (type, title, message, options = {}) => {
    Toast.show({
        type,
        text1: title,
        text2: message,
        position: options.position || 'bottom',
        topOffset: options.topOffset || 40,
        ...options,
    });
};
