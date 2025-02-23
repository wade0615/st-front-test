# st-front-test

這是一個基於 Vite 和 React 的前端專案，使用 Node.js 20.16 進行開發。為了確保專案能夠正常運行，您需要同時啟動 `st-proxy-server` 中的 Node.js 伺服器。

## 目錄

- [專案簡介](#專案簡介)
- [功能](#功能)
- [安裝](#安裝)
- [使用方法](#使用方法)
- [目錄結構](#目錄結構)
- [貢獻](#貢獻)
- [授權](#授權)

## 專案簡介

`st-front-test` 是一個使用 Vite 和 React 開發的前端專案，旨在提供高效的開發體驗和快速的構建速度。專案使用 Node.js 20.16 進行開發，並依賴 `st-proxy-server` 提供的 API 服務。

## 功能

- 使用 Vite 進行快速構建和開發
- 使用 React 作為前端框架
- 支援 API 請求，需啟動 `st-proxy-server` 提供的 Node.js 伺服器

## 安裝

1. 克隆這個倉庫到你的本地環境：

   ```bash
   git clone https://github.com/wade0615/st-front-test.git
   ```

2. 進入專案目錄, 安裝依賴：

   ```bash
   cd st-front-test
   cd ./st-proxy-server
   nvm use 20.16
   npm i

   cd ./st-react-client
   nvm use 20.16
   npm i
   ```

## 使用方法

1. 啟動 `st-proxy-server` 中的 Node.js 伺服器：

   ```bash
   cd ./st-proxy-server
   node server.js
   ```

2. 啟動 `st-react-client`：

   ```bash
   cd ./st-react-client
   npm run dev
   ```

3. 在瀏覽器中打開 [http://localhost:5173/dashboard](http://localhost:5173/dashboard) 查看應用程式。

## 目錄結構

```plaintext
st-front-test/
  ├──
  ├── .gitignore
  ├── st-react-client/
      ├── package.json
      └── ...
  ├── st-proxy-server/
      ├── package.json
      └── ...
```
