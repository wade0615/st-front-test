import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Error404 from 'pages/errors/Error404';
import Home from 'pages/home/Home';
import NoAccess from 'pages/noAccess/NoAccess';

import { BaseLayout } from 'layout/index';

import localStorageUtil from 'utils/LocalStorageUtil';
import LocalStorageKeys from 'constants/LocalStorageKeys';

import routerPath from 'routes/router.path';

// 子路由的類型
interface ChildRoute {
  index?: boolean; // 是否為索引路由
  authCode: string; // 路由的權限代碼
  path: string; // 子路由的路徑
  breadcrumbPath?: string; // 用於麵包屑
  element: React.ReactNode; // 要渲染的組件
  pageTitle?: string; // 頁面的標題
  tooltip?: React.ReactNode; // 工具提示
}

// 路由配置的類型
interface RouteConfig {
  authCode: string; // 路由的權限代碼
  path: string; // 路由的路徑
  element: React.ReactNode; // 訪問時要渲染的元件
  errorElement?: React.ReactNode; // 錯誤頁面
  children?: ChildRoute[]; // 子路由
}

function HasAuth({
  routeConfig,
  originalElement
}: {
  routeConfig: ChildRoute;
  originalElement: React.ReactNode;
}) {
  const userInfo = localStorageUtil.getItem(LocalStorageKeys.UserInfo) as {
    authItems: string[]; // 權限清單
    username: string;
    email: string;
  };
  const checkAuth = !!userInfo && false;
  const hasPermission =
    userInfo &&
    Array.isArray(userInfo.authItems) &&
    userInfo.authItems.includes(routeConfig.authCode);
  if (checkAuth && routeConfig.authCode && !hasPermission) {
    return <NoAccess />;
  }
  return originalElement; // 使用傳遞的原始元件
}

function applyHasAuth(route: (typeof routerConfig)[0]) {
  if (route.authCode && route.element) {
    const originalElement = route.element; // 保存原始元件
    route.element = (
      <HasAuth routeConfig={route} originalElement={originalElement} />
    ); // 傳遞原始元件
  }
  if (route.children) {
    route.children.forEach(applyHasAuth);
  }
}

export const routerConfig: RouteConfig[] = [
  {
    authCode: '', // 路由的權限代碼
    path: '/', // 路由的路徑
    element: <BaseLayout></BaseLayout>, // 訪問時要渲染的元件
    errorElement: <Error404 />, // 有任何錯誤，例如無效的路由，就會渲染這個元件
    children: [
      // 子路由的陣列，它們會在訪問此路由時進一步導航
      /**
       ** 首頁
       **/
      {
        index: true, // 表示當路徑為 '/' 時，這個路由會被使用
        authCode: '', // 子路由的權限代碼
        path: routerPath.home, // 子路由的路徑
        breadcrumbPath: '', // 頁面路由，用於麵包屑
        element: <Home />,
        pageTitle: '首頁', // 可以添加首頁的標題
        tooltip: <p>首頁喔</p>
      }
    ]
  },
  {
    authCode: '',
    path: '*', // 匹配任何未在前面定義的路徑
    // element: <RedirectUrl /> // 當訪問任何未在前面定義的路徑時，將渲染此元件
    element: <div>???</div>
  }
];

routerConfig.forEach(applyHasAuth);

const router = createBrowserRouter(routerConfig);

export default router;
