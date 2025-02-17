import { Outlet } from 'react-router-dom';

import './BaseLayout.scss';

// import ExceptionHandleService from 'utils/ExceptionHandler';
// const _EHS = new ExceptionHandleService({
//   _NAME: 'layout/Baselayout.tsx',
//   _NOTICE: ''
// });

/* 基本樣式 */
function BaseLayout() {
  return (
    <div id='base_layout'>
      {/* Header */}
      <BaseLayoutHeader />
      {/* Main content */}
      <Outlet></Outlet>
      {/* Footer */}
      <BlaseLayoutFooter />
    </div>
  );
}

/** Footer */
function BlaseLayoutFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='base_layout_footer'>
      <p>© {currentYear} By Harry Potter</p>
      <p>Theme From Base Layout</p>
    </footer>
  );
}

/** Header */
function BaseLayoutHeader() {
  return (
    <header className='base_layout_header'>
      <h1>Welcome to My App</h1>
    </header>
  );
}

export default BaseLayout;
