import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Proxy DuckMath
app.use("/proxy/duckmath", createProxyMiddleware({
  target: "https://duckmath.github.io",
  changeOrigin: true,
  pathRewrite: { "^/proxy/duckmath": "" },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
