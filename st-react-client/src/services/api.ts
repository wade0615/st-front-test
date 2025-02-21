// import TaiwanStockInfo from 'fakeData/TaiwanStockInfo.json';
// import TaiwanStockMonthRevenue from 'fakeData/TaiwanStockMonthRevenue.json';

import { get } from './sub_services/base';
import ExceptionHandleService from 'utils/ExceptionHandler';

const _EHS = new ExceptionHandleService({
  _NAME: 'services/api.ts',
  _NOTICE: ''
});

// const baseUrl = 'https://api.finmindtrade.com/api/v4/data';
const baseUrl = 'http://localhost:4000/api/v4/data';
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
    // const result = TaiwanStockInfo;
    return result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    _EHS.errorReport(errorMessage, 'getTaiwanStockInfoList', _EHS._LEVEL.ERROR);
    return Promise.reject(errorMessage);
  }
};

const getTaiwanStockMonthRevenueList = async (
  stock_id: string
): Promise<
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
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1); // 昨天
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 6); // 前 6 年

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const url = `${baseUrl}?dataset=TaiwanStockMonthRevenue&token=${token}&data_id=${stock_id}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    const result = await get(url);
    // const result = TaiwanStockMonthRevenue;
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
