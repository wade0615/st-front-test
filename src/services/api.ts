import TaiwanStockInfo from 'fakeData/TaiwanStockInfo.json';
import TaiwanStockMonthRevenue from 'fakeData/TaiwanStockMonthRevenue.json';

// import { get } from './sub_services/base';
import ExceptionHandleService from 'utils/ExceptionHandler';

const _EHS = new ExceptionHandleService({
  _NAME: 'services/api.ts',
  _NOTICE: ''
});

// const baseUrl = 'https://api.finmindtrade.com/api/v4/data';
// const token =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wMi0yMCAxOTo0MjowNCIsInVzZXJfaWQiOiJ3c3cwNjE1IiwiaXAiOiIyMTkuODUuMzAuMjAzIn0.wPp17AOBz-lfa3B8yYhtmcfOYMYJnk7SVXOPY3CE6sA';

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
    // const url = `${baseUrl}?dataset=TaiwanStockInfo&token=${token}`;
    // const result = await get(url);
    const result = TaiwanStockInfo;
    return result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    _EHS.errorReport(errorMessage, 'getTaiwanStockInfoList', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  }
};

const getTaiwanStockMonthRevenueList = async (): Promise<
  {
    date: string;
    stock_id: string;
    country: string;
    revenue: number;
    revenue_month: number;
    revenue_year: number;
  }[]
> => {
  try {
    // const url = `${baseUrl}?dataset=TaiwanStockInfo&token=${token}&data_id=2330&start_date=2024-01-01&end_date=2025-02-28`;
    // const result = await get(url);
    const result = TaiwanStockMonthRevenue;
    return result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    _EHS.errorReport(
      errorMessage,
      'getTaiwanStockMonthRevenueList',
      _EHS._LEVEL.ERROR
    );
    return Promise.reject(errorMessage);
  }
};

const api = {
  getTaiwanStockInfoList,
  getTaiwanStockMonthRevenueList
};

export default api;
