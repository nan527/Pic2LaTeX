const STORAGE_KEYS = {
  API_CONFIG: 'pic2latex_api_config',
  HISTORY: 'pic2latex_history'
};

export const getApiConfig = () => {
  try {
    const config = localStorage.getItem(STORAGE_KEYS.API_CONFIG);
    return config ? JSON.parse(config) : null;
  } catch {
    return null;
  }
};

export const saveApiConfig = (config) => {
  localStorage.setItem(STORAGE_KEYS.API_CONFIG, JSON.stringify(config));
};

export const getHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const saveToHistory = (item) => {
  const history = getHistory();
  history.unshift({
    ...item,
    id: Date.now(),
    timestamp: new Date().toISOString()
  });
  // Keep only last 100 items
  if (history.length > 100) {
    history.pop();
  }
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

export const deleteFromHistory = (id) => {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
