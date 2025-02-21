import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { InitState } from 'store/reducers/initReducer';
import 'pages/dashboard/Dashboard.scss';

import api from 'services/api';

import Chart from './chart/Chart';
import Table from './table/Table';

import ExceptionHandleService from 'utils/ExceptionHandler';

const _EHS = new ExceptionHandleService({
  _NAME: 'pages/dashboard/Dashboard.tsx',
  _NOTICE: ''
});

function Dashboard() {
  const [curTarget, setCurTarget] = useState<string>('');
  const [taiwanStockInfoList, setTaiwanStockInfoList] = useState<
    {
      xAxis: string;
      yAxis_1: number;
      yAxis_2: number;
    }[]
  >([]);

  const selectedValue = useSelector(
    (state: { init: InitState }) => state.init.selectedValue
  );

  /** 取得列表 */
  const getTaiwanStockMonthRevenueList = useCallback(async () => {
    try {
      const list = await api.getTaiwanStockMonthRevenueList();
      if (list) {
        return list.map((item) => ({
          xAxis: `${item.revenue_year}${item.revenue_month}`,
          yAxis_1: item.revenue,
          yAxis_2:
            item.revenue /
            parseInt(`${item.revenue_year}${item.revenue_month}`, 10)
        }));
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      _EHS.errorReport(
        errorMessage,
        'getTaiwanStockMonthRevenueList',
        _EHS._LEVEL.ERROR
      );
    }
  }, []);

  // // 初始化
  useEffect(() => {
    const init = async () => {
      try {
        const stockList = await getTaiwanStockMonthRevenueList();
        if (stockList) {
          setTaiwanStockInfoList(stockList);
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        _EHS.errorReport(errorMessage, 'init', _EHS._LEVEL.ERROR);
      }
    };
    init();
  }, [getTaiwanStockMonthRevenueList]);

  useEffect(() => {
    setCurTarget(selectedValue || '');
  }, [setCurTarget, selectedValue]);

  const generateFakeData = () => {
    const data = [];
    for (let i = 1; i <= 60; i++) {
      data.push({
        xAxis: `string${i}`,
        yAxis_1: Math.floor(Math.random() * 100),
        yAxis_2: Math.floor(Math.random() * 500)
      });
    }
    return data;
  };

  return (
    <div id='dashboard'>
      <header>
        <h1>{curTarget ? curTarget : 'No Value Selected'}</h1>
      </header>
      <section>
        <div className='chart-button-wrapper'>
          <button>每月營收</button>
          <button>近五年</button>
        </div>
        <div className='chart-container'>
          <p>數據圖表</p>
          <Chart chartData={taiwanStockInfoList || generateFakeData()} />
        </div>
      </section>
      <section>
        <button>詳細數據</button>
        <Table tableData={taiwanStockInfoList || generateFakeData()} />
      </section>
      <footer>
        <p>圖表單位：千元，數據來自公開資訊官測站</p>
        <p>網頁圖表歡迎轉貼引用，請註明出處為台灣魔法部</p>
      </footer>
    </div>
  );
}

export default Dashboard;
