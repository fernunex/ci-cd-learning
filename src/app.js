import { createServer } from "node:http";
import { URL } from "node:url";
import { add } from "./calculator.js";

export function createApp() {
  return createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");

    res.setHeader("Content-Type", "application/json");

    if (url.pathname === "/health") {
      res.writeHead(200);
      res.end(JSON.stringify({ status: "healthy" }));
      return;
    }

    if (url.pathname === "/add") {
      const a = Number(url.searchParams.get("a"));
      const b = Number(url.searchParams.get("b"));

      if (
        !url.searchParams.has("a") ||
        !url.searchParams.has("b") ||
        !Number.isFinite(a) ||
        !Number.isFinite(b)
      ) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid numbers" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ result: add(a, b) }));
      return;
    }

    if (url.pathname === "/hello") {
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Hello from CI/CD!" }));
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  });
}
