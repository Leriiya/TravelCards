import "./App.css";
import Cards from "./components/Cards/Cards";
import { BrowserRouter } from "react-router-dom";
import Pages from "./Pages/Pages";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Cards />
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
