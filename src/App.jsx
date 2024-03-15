import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import TaskList from "./Components/TaskList";
import LogIn from "./Components/Authentication/LogIn";
import Register from "./Components/Authentication/Register";

const App = () => {
  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
