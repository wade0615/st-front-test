import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InitState } from 'store/reducers/initReducer';
import 'pages/dashboard/Dashboard.scss';

import Chart from './chart/Chart';

function Dashboard() {
  const [curTarget, setCurTarget] = useState<string>('');
  const selectedValue = useSelector(
    (state: { init: InitState }) => state.init.selectedValue
  );

  useEffect(() => {
    setCurTarget(selectedValue || '');
  }, [selectedValue]);

  return (
    <div id='dashboard'>
      <header>
        <h1>{curTarget ? curTarget : 'No Value Selected'}</h1>
      </header>
      <section>
        <div className='chart-button-wrapper'>
          <button>圖表一</button>
          <button>圖表三</button>
        </div>
        <div className='chart-container'>
          數據圖表
          <Chart
            chartData={[
              {
                xAxis: 'string1',
                yAxis_1: 20,
                yAxis_2: 300
              },
              {
                xAxis: 'string2',
                yAxis_1: 50,
                yAxis_2: 350
              },
              {
                xAxis: 'string3',
                yAxis_1: 20,
                yAxis_2: 150
              }
            ]}
          />
        </div>
      </section>
      <section>數據表格</section>
      <footer>
        <p>圖表單位：千元，數據來自公開資訊官測站</p>
        <p>網頁圖表歡迎轉貼引用，請註明出處為台灣魔法部</p>
      </footer>
    </div>
  );
}

export default Dashboard;
