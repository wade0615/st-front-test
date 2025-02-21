import Swal from 'sweetalert2';
import localStorageUtil from 'utils/LocalStorageUtil';
import LocalStorageKeys from 'constants/LocalStorageKeys';

// 處理 api response
const apiResponseHandler = async (
  res: Response,
  type: 'json' | 'blob' | 'text' = 'json'
) => {
  try {
    if (res.status === 502 || res.status === 504) {
      errorFire('連線逾時，請檢查您的網路環境。', res.status);
      return null;
    }
    if (type === 'json') {
      const response = await res.json();
      let msg = '';
      if (res?.ok || res?.status === 200) {
        switch (res?.status) {
          case 200:
            return response.result || response.data;
          default:
            msg = response?.result?.msg || response.result?.message;
            errorFire(msg, response?.statusCode);
            return null;
        }
      } else if (res?.status === 403) {
        switch (response?.status) {
          case 403: //登入逾時，請重新登入 accessToken & refreshToken 過期
            msg = response?.result?.msg;
            errorFire(msg, response?.statusCode).then(() => {
              // 無權限導至 首頁 or login 頁面
              localStorageUtil.removeItem(LocalStorageKeys.UserInfo);
              window.location.href = '/';
            });
            return;
          default:
            errorFire(response?.result?.msg, response?.statusCode);
        }
      } else {
        errorFire(response?.result?.msg, response?.statusCode);
      }
    } else if (type === 'blob') {
      const response = await res.blob();
      return response;
    } else {
      return res;
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    errorFire(errorMessage, 500);
    return null;
  }
};

// sweetAlert fire
function errorFire(msg: string, statusCode?: number) {
  const showMsg = true; // 錯誤訊息顯示開關
  return Swal.fire({
    icon: 'error',
    // title: 'Oops...',
    // text: msg
    html: !statusCode ? showMsg : `網路不穩，請重新再試<br>(${statusCode})`
  });
}

export default apiResponseHandler;
