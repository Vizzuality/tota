export default {
  dark: {
    container: 'text-white bg-transparent bg-blue9',
    open: 'bg-blue9 text-white',
    closed: 'text-white',
    prefix: {
      base: 'text-white text-base font-bold',
    },
    icon: {
      closed: 'text-white',
      open: 'transform rotate-180',
      disabled: 'text-gray-400',
    },
    item: {
      base: 'text-base font-bold text-white',
      highlighted: 'text-base text-white opacity-30',
      disabled: 'text-base opacity-50 pointer-events-none',
    },
  },
  light: {
    container: 'text-gray-600 bg-transparent ring-1 ring-gray-400',
    open: 'ring-2 ring-blue-400 bg-white text-gray-600',
    closed: 'text-gray-400',
    prefix: {
      base: 'text-gray-800',
    },
    icon: {
      closed: 'text-gray-600',
      open: 'text-blue-500 transform rotate-180',
      disabled: 'text-gray-400',
    },
    item: {
      base: 'text-sm text-gray-400',
      highlighted: 'text-sm bg-gray-100 text-gray-800',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  states: {
    none: '',
    error: 'ring-red-500',
    valid: 'ring-green-500',
  },
  sizes: {
    base: 'pl-4 pr-10 py-4 text-lg',
    s: 'pl-4 pr-10 py-1.5 text-sm',
  },
};
