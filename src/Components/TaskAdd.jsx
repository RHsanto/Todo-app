import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../Redux/Slice/taskSlice";
import { useState } from "react";
import TaskList from "./TaskList";

const TaskAdd = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector(state => state.tasks.allTodos);

  // Initialize newTodo with default values
  const [newTodo, setNewTodo] = useState({ id: null, title: "", description: "", priority: "low" });

  const handleAddNewToDo = () => {
    // Ensure title and description are not empty strings
    if (!newTodo.title.trim() || !newTodo.description.trim()) return;

    if (newTodo.id === null) {
      dispatch(addTodo(newTodo));
    } else {
      dispatch(editTodo(newTodo));
    }
    // Reset newTodo state after adding/editing
    setNewTodo({ id: null, title: "", description: "", priority: "low" });
  };

  const handleEdit = todo => {
    // Set newTodo state to the selected todo for editing
    setNewTodo({ ...todo });
  };

  const handleDelete = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTodo.title} // Ensure the value of the input field is controlled by newTodo.title
          onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={newTodo.description} // Ensure the value of the textarea is controlled by newTodo.description
          onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
          placeholder="Description"
        />
        <select
          value={newTodo.priority} // Ensure the value of the select field is controlled by newTodo.priority
          onChange={e => setNewTodo({ ...newTodo, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleAddNewToDo}>
          {newTodo.id === null ? "Add Task" : "Update Task"}
        </button>
      </div>
      <div>
        <TaskList tasks={allTodos} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default TaskAdd;
