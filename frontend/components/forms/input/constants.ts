export const THEME = {
  dark: {
    base: 'w-full leading-tight text-white text-center h-16',
    status: {
      none: 'border-blue2',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-500 opacity-50',
    },
    icon: 'text-white',
    mode: {
      normal: '',
      underlined: 'border-b',
    },
  },
  light: {
    base: 'w-full text-blue9 bg-transparent text-center h-16',
    status: {
      none: 'border-blue2',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-800 opacity-50',
    },
    icon: 'text-gray-800 text-opacity-50',
    mode: {
      normal: '',
      underlined: 'border-b-2',
    },
  },
};
