import 'pages/dashboard/Dashboard.scss';

function Home() {
  return (
    <div id='dashboard'>
      <header>
        <h1>三商壽</h1>
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

export default Home;
