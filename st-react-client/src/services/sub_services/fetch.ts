import fetch from 'isomorphic-fetch';
import Swal from 'sweetalert2';
import apiResponseHandler from './apiResponseHandler';
import localStorageUtil from 'utils/LocalStorageUtil';
import LocalStorageKeys from 'constants/LocalStorageKeys';

import ExceptionHandleService from 'utils/ExceptionHandler';

const _EHS = new ExceptionHandleService({
  _NAME: 'services/fetch.tsx',
  _NOTICE: ''
});

/**
 * fetch
 * @param {*} url
 * @param {*} options
 * @param {*} token
 */
const fetchJson = async (url: string, options: RequestInit = {}) => {
  try {
    const userInfo = localStorageUtil.getItem(LocalStorageKeys.UserInfo) as {
      accessToken?: string;
    } | null;
    const token = userInfo?.accessToken || '';
    const authorization = token ? { Authorization: `Bearer ${token}` } : {};
    const requestHeaders = new Headers({
      ...(authorization as HeadersInit),
      Accept: 'application/json',
      ...(options.headers ? (options.headers as HeadersInit) : {})
    });

    if (
      !requestHeaders.has('Content-Type') &&
      !(
        options &&
        options.body &&
        (options.body as FormData) instanceof FormData
      )
    ) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    return await fetch(url, {
      ...options,
      headers: requestHeaders
    })
      .then(async (response: Response) => {
        const responseData = await apiResponseHandler(response, 'json');
        return responseData;
      })
      .catch((err: Error) => {
        errorNotice(`status: ${err.name} | ${err.message}`);
        _EHS.errorReport(err, '', _EHS._LEVEL.ERROR);
      });
  } catch (error) {
    const errorMessage = (error as Error).message;
    alert('SYSTEM FETCH ERROR: ' + errorMessage);
    _EHS.errorReport(error, 'SYSTEM FETCH ERROR:', _EHS._LEVEL.ERROR);
  }
};

const fetchBlob = (
  url: string,
  options: RequestInit = {}
  // type: string = 'blob'
) => {
  try {
    const userInfo = localStorageUtil.getItem(LocalStorageKeys.UserInfo) as {
      accessToken?: string;
    } | null;
    const token = userInfo?.accessToken || '';
    const authorization = token ? { Authorization: `Bearer ${token}` } : {};
    const requestHeaders = new Headers({
      ...(authorization as HeadersInit),
      Accept: 'application/json',
      ...(options.headers ? (options.headers as HeadersInit) : {})
    });

    if (
      !requestHeaders.has('Content-Type') &&
      !(options && options.body && options.body instanceof FormData)
    ) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    return fetch(url, { ...options, headers: requestHeaders })
      .then((response) => {
        // Check if the response has the Content-Disposition header
        const contentDispositionHeader = response.headers.get(
          'Content-Disposition'
        );
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          // Handle JSON response here
          return apiResponseHandler(response, 'json');
        }

        if (contentDispositionHeader) {
          // Extract the filename from the header
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDispositionHeader);
          const filename =
            matches !== null && matches[1]
              ? matches[1].replace(/['"]/g, '')
              : 'downloaded-file.zip';

          // You can use the filename here for further processing if needed
          console.log('Suggested filename:', filename);
        }
        // Start the download by creating a Blob from the response and triggering a download
        return response.blob();
      })
      .then((blob: Blob) => {
        return blob;
      })
      .catch((err) => {
        errorNotice(`status: ${err.name} | ${err.message}`);
        _EHS.errorReport(err, '', _EHS._LEVEL.ERROR);
      });
  } catch (error) {
    const errorMessage = (error as Error).message;
    alert('SYSTEM FETCH ERROR: ' + errorMessage);
    _EHS.errorReport(error, 'SYSTEM FETCH ERROR:', _EHS._LEVEL.ERROR);
  }
};

const errorNotice = (msg: string) => {
  Swal.fire({
    icon: 'error',
    // title: 'Oops...',
    // text: msg
    html: `抱歉，系統出現技術問題，我們正在積極著手解決。請幾分鐘後再試一次或請洽系統管理員。<br>${
      msg ? `(${msg})` : ''
    }`
  });
};

export { fetchBlob };
export default fetchJson;
