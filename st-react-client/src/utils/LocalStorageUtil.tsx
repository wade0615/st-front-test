import ExceptionHandleService from 'utils/ExceptionHandler';

const _EHS = new ExceptionHandleService({
  _NAME: 'utils/LocalStorageUtil.tsx',
  _NOTICE: ''
});

const PRE_TEXT = 'personal_';

/**
 * 設定 localStorage 內容，帶有 TTL（有效期限）
 * @param key 儲存的鍵值
 * @param value 要存入的值
 * @param ttl 過期時間（毫秒）預設 1 小時
 */
const setItem = (
  key: string,
  value: unknown,
  ttl: number = 60 * 60 * 1000
): void => {
  try {
    const now = new Date().getTime();
    const item = {
      value,
      expiry: now + ttl
    };
    localStorage.setItem(PRE_TEXT + key, JSON.stringify(item));
  } catch (error) {
    console.error('[ERROR] setItem:', error);
    _EHS.errorReport(error, 'setItem', _EHS._LEVEL.ERROR);
  }
};

/**
 * 從 localStorage 取得值，並檢查是否過期
 * @param key 儲存的鍵值
 * @returns 若過期或無資料則回傳 null
 */
const getItem = (key: string): unknown | null => {
  try {
    const itemStr = localStorage.getItem(PRE_TEXT + key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(PRE_TEXT + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.error(`${key} 取得參數失敗`, error);
    _EHS.errorReport(error, 'getItem', _EHS._LEVEL.ERROR);
    return null;
  }
};

/**
 * 移除 localStorage 內指定的鍵值
 * @param key 儲存的鍵值
 */
const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(PRE_TEXT + key);
  } catch (error) {
    _EHS.errorReport(error, 'removeItem', _EHS._LEVEL.ERROR);
  }
};

/**
 * 清空所有 localStorage 內容
 */
const cleanAll = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    _EHS.errorReport(error, 'cleanAll', _EHS._LEVEL.ERROR);
  }
};

export default { setItem, getItem, removeItem, cleanAll };
