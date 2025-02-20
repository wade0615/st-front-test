import fetchJson, { fetchBlob } from './fetch';
import Swal from 'sweetalert2';
import store from 'store';
import { open, close } from 'store/reducers/loadingReducer';

import ExceptionHandleService from 'utils/ExceptionHandler';

const _EHS = new ExceptionHandleService({
  _NAME: 'service/base.js',
  _NOTICE: 'api method function'
});

let activeRequests = 0;

const openLoading = () => {
  if (activeRequests === 0) {
    try {
      store.dispatch(open());
    } catch (error) {
      _EHS.errorReport(error, 'openLoading', _EHS._LEVEL.ERROR);
    }
  }
  activeRequests++;
};

const closeLoading = () => {
  activeRequests--;
  if (activeRequests === 0) {
    try {
      store.dispatch(close());
    } catch (error) {
      _EHS.errorReport(error, 'closeLoading', _EHS._LEVEL.ERROR);
    }
  }
};

/**
 * url:string, options:object
 * @param {*} url
 * @param {*} options
 */
export const get = async (
  url: string,
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'GET';
    options.credentials = 'include';
    const res = await fetchJson(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'get', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

/**
 * url:string, body:object, options:object
 * @param {*} url
 * @param {*} body
 * @param {*} options
 */
export const post = async (
  url: string,
  body: object = {},
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'POST';
    options.body = JSON.stringify(body);
    options.credentials = 'include';
    const res = await fetchJson(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'post', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

/**
 * url:string, body:object, options:object
 * @param {*} url
 * @param {*} body
 * @param {*} options
 */
export const put = async (
  url: string,
  body: object = {},
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'PUT';
    options.body = JSON.stringify(body);
    options.credentials = 'include';
    const res = await fetchJson(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'put', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

export const postFormData = async (
  url: string,
  body: FormData,
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'POST';
    options.body = body;
    options.credentials = 'include';
    const res = await fetchJson(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'postFormData', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

export const patchFormData = async (
  url: string,
  body: FormData,
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'PATCH';
    options.body = body;
    options.credentials = 'include';
    const res = await fetchJson(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'patchFormData', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

export const patch = async (
  url: string,
  body: object = {},
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'PATCH';
    options.body = JSON.stringify(body);
    options.credentials = 'include';
    const res = await fetchJson(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'patch', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

export const del = async (
  url: string,
  body: object = {},
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'DELETE';
    options.body = JSON.stringify(body);
    options.credentials = 'include';
    const res = await fetchJson(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'del', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

/**
 * url:string, body:object, options:object
 * @param {*} url
 * @param {*} body
 * @param {*} options
 */
export const postBlob = async (
  url: string,
  body: object = {},
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'POST';
    options.body = JSON.stringify(body);
    options.credentials = 'include';
    // options.credentials =  "same-origin";
    const res = await fetchBlob(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'post', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

export const getBlob = async (
  url: string,
  options: RequestInit = {},
  isLoading = true
) => {
  if (isLoading) openLoading();
  try {
    options.method = 'GET';
    options.credentials = 'include';
    // options.credentials =  "same-origin";
    const res = await fetchBlob(url, options);
    return res;
  } catch (error) {
    const errorMessage = (error as Error).message;
    Swal.fire('ERROR', `fetch: ${url} | ${errorMessage}`, 'error');
    _EHS.errorReport(error, 'post', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  } finally {
    if (isLoading) closeLoading();
  }
};

export default {
  get,
  post,
  put,
  postFormData,
  patch,
  del,
  postBlob,
  getBlob,
  patchFormData
};
