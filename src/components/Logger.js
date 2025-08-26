const logStorageKey = "app_logs";

const logEvent = (level, message, details = {}) => {
  const logs = JSON.parse(localStorage.getItem(logStorageKey)) || [];
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...details
  };
  logs.push(logEntry);
  localStorage.setItem(logStorageKey, JSON.stringify(logs));
};

export const logInfo = (message, details) => logEvent("INFO", message, details);
export const logError = (message, details) => logEvent("ERROR", message, details);
export const logWarn = (message, details) => logEvent("WARN", message, details);
