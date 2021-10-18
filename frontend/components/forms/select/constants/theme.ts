export default {
  dark: {
    container: 'text-white bg-transparent bg-blue-800',
    open: 'bg-blue-800 text-white',
    closed: 'text-white',
    menu: 'border-t border-gray-50',
    prefix: {
      base: 'text-white text-lg font-bold',
    },
    icon: {
      closed: 'text-white',
      open: 'transform rotate-180',
      disabled: 'text-gray-400',
    },
    item: {
      base: 'text-lg font-bold text-white',
      highlighted: 'text-lg font-bold text-white opacity-30',
      disabled: 'text-lg font-bold opacity-50 pointer-events-none',
    },
  },
  light: {
    container: 'text-blue-800 bg-transparent',
    open: 'ring-2 ring-blue-400 bg-white text-gray-600',
    closed: 'text-gray-400',
    menu: '',
    prefix: {
      base: 'text-blue-800 text-lg',
    },
    icon: {
      closed: 'text-gray-600',
      open: 'text-blue-500 transform rotate-180',
      disabled: 'text-gray-400',
    },
    item: {
      base: 'text-base',
      highlighted: 'text-base bg-gray-100 text-gray-800',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  transparent: {
    container: 'text-white bg-transparent',
    open: 'bg-transparent text-white',
    closed: 'text-white bg-transparent',
    menu: 'bg-white',
    prefix: {
      base: 'text-white font-bold text-5xl',
    },
    icon: {
      closed: 'text-white',
      open: 'transform rotate-180',
      disabled: 'text-gray-400',
    },
    item: {
      base: 'text-lg text-blue-800 font-bold',
      highlighted: 'text-lg text-blue-800 font-bold opacity-40',
      disabled: 'text-lg opacity-50 pointer-events-none',
    },
  },
  states: {
    none: '',
    error: 'ring-red-500',
    valid: 'ring-green-500',
  },
  sizes: {
    base: 'pl-4 pr-4 py-6 text-lg',
    s: 'pl-4 pr-4 py-4 text-base',
  },
};
