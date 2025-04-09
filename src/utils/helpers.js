export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const weightedRandom = (options, weights) => {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (const option of options) {
    random -= weights[option];
    if (random <= 0) {
      return option;
    }
  }
  return options[options.length - 1];
};

export const downloadJSON = (data, filename) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

export const validateJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}; 