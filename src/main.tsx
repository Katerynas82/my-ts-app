import { createRoot } from "react-dom/client";
import App from "./components/App/App.js";
import "./index.css";
import "modern-normalize";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root"))as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
