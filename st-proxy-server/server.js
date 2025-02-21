const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 4000; // 你可以更改為其他 Port

// 更新 CORS 設置
const corsOptions = {
  origin: "http://localhost:5173", // 允許的來源
  credentials: true, // 允許攜帶憑證
};

app.use(cors(corsOptions)); // 使用更新的 CORS 設置
app.use(express.json()); // 解析 JSON 請求

// 設置根路由
app.get("/", (req, res) => {
  res.send("Welcome to the Proxy Server");
});

// 設置 Proxy 路由
app.get("/api/v4/data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.finmindtrade.com/api/v4/data",
      {
        params: req.query, // 轉發前端傳來的參數
      }
    );
    res.json(response.data); // 把結果回傳給前端
  } catch (error) {
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
});

// 啟動伺服器
app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
  } else {
    console.log(`Proxy Server running at http://localhost:${PORT}`);
  }
});
