import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

import { App } from "@/components/app";
import { store } from "./store/store";

import ruRu from "antd/locale/ru_Ru";

import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider locale={ruRu}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
