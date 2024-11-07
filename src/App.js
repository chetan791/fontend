import logo from "./logo.svg";
import "./App.css";

import { MainRoutes } from "./pages/MainRoutes";
import { Counter } from "./pages/Counter";
import { Map } from "./pages/Map";

function App() {
  return (
    <div className="App">
      <Map />
      {/* <MainRoutes /> */}
      {/* <Counter /> */}
    </div>
  );
}

export default App;
