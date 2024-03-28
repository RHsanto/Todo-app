import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import AddTask from "../Components/Todo/AddTask";
import AllTodo from "../Components/Todo/AllTodo";
import EditTask from "../Components/Todo/EditTask";
import Navbar from "../Components/Navbar";

const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />

          {/* Route for adding a new task */}
          <Route path="/add-todo" element={<AddTask />} />

          {/* Route for displaying all tasks */}
          <Route path="/all-todo" element={<AllTodo />} />

          {/* Route for editing a task */}
          <Route path="/edit-todo" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;
