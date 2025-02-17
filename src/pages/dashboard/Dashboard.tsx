import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InitState } from 'store/reducers/initReducer';
import 'pages/dashboard/Dashboard.scss';

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
      <section>數據圖表</section>
      <section>數據表格</section>
      <footer>
        <p>圖表單位：千元，數據來自公開資訊官測站</p>
        <p>網頁圖表歡迎轉貼引用，請註明出處為台灣魔法部</p>
      </footer>
    </div>
  );
}

export default Dashboard;
