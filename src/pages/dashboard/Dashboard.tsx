import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InitState } from 'store/reducers/initReducer';
import 'pages/dashboard/Dashboard.scss';

import Chart from './chart/Chart';
import Table from './table/Table';

function Dashboard() {
  const [curTarget, setCurTarget] = useState<string>('');
  const selectedValue = useSelector(
    (state: { init: InitState }) => state.init.selectedValue
  );

  useEffect(() => {
    setCurTarget(selectedValue || '');
  }, [selectedValue]);

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
          <Chart chartData={generateFakeData()} />
        </div>
      </section>
      <section>
        <button>詳細數據</button>
        <Table tableData={generateFakeData()} />
      </section>
      <footer>
        <p>圖表單位：千元，數據來自公開資訊官測站</p>
        <p>網頁圖表歡迎轉貼引用，請註明出處為台灣魔法部</p>
      </footer>
    </div>
  );
}

export default Dashboard;
