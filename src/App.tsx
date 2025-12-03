// src/App.tsx
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Add this import
import { store } from "./app/store";
import AppRoutes from "./app/routes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;