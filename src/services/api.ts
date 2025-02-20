import { get } from './sub_services/base';
import ExceptionHandleService from 'utils/ExceptionHandler';

const _EHS = new ExceptionHandleService({
  _NAME: 'services/api.ts',
  _NOTICE: ''
});

const baseUrl = 'https://api.finmindtrade.com/api/v4/data';
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wMi0yMCAxOTo0MjowNCIsInVzZXJfaWQiOiJ3c3cwNjE1IiwiaXAiOiIyMTkuODUuMzAuMjAzIn0.wPp17AOBz-lfa3B8yYhtmcfOYMYJnk7SVXOPY3CE6sA';

const getTaiwanStockInfoList = async (): Promise<
  {
    industry_category: string;
    stock_id: string;
    stock_name: string;
    type: string;
    date: string;
  }[]
> => {
  try {
    const url = `${baseUrl}?dataset=TaiwanStockInfo&token=${token}`;
    const result = await get(url);
    return result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    _EHS.errorReport(errorMessage, 'getTaiwanStockInfoList', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  }
};

export { getTaiwanStockInfoList };
