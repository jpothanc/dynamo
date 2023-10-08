import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataView from "./pages/DataView";
import About from "./pages/About";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<DataView />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
