// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { ThemeProvider } from "@emotion/react"; // Import ThemeProvider from Emotion
import { theme } from "./styles/themes";
import GlobalStyles from "./styles/globalStyles"; // Import GlobalStyles from Emotion

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
