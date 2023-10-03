import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataView from "./pages/DataView";
import About from "./pages/About";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DataView />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
