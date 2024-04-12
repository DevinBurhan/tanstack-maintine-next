import secureLocalStorage from "react-secure-storage";

const getItem = (key) => {
  const data = secureLocalStorage.getItem(key);

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItem = (key, value) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
  return secureLocalStorage.setItem(key, stringify);
};

const removeItem = (key) => {
  secureLocalStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
