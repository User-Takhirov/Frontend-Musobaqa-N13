import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { client } from "./config/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0eb182",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
