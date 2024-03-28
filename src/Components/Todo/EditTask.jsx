// EditTask.js
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateJobs } from "../../Redux/Slice/jobSlice";
import { useState, useEffect } from "react";

const EditTask = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id: initialId,
    title: initialTitle,
    desc: initialDesc,
    priority: initialPriority,
  } = location.state;

  const [id, setId] = useState(initialId || "");
  const [title, setTitle] = useState(initialTitle || "");
  const [desc, setDesc] = useState(initialDesc || "");
  const [priority, setPriority] = useState(initialPriority || "");

  useEffect(() => {
    setId(initialId || "");
    setTitle(initialTitle || "");
    setDesc(initialDesc || "");
    setPriority(initialPriority || "");
  }, [initialId, initialTitle, initialDesc, initialPriority]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateJobs({ id, title, desc, priority }));
    navigate("/");
  };

  return (
    <div className="my-10 container mx-auto w-2/6">
      <h1 className="text-3xl mb-10 text-center">Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title ">Title: </label>
          <input
            type="text"
            className="outline-none border-2 p-2 w-full mb-4 mt-1"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="desc">Description: </label>
          <input
            className="outline-none border-2 p-2 w-full mb-4 mt-1"
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <label>Priority :</label> <br />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="outline-none border-2 p-2 w-full mb-4 mt-1"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-violet-500 text-white rounded  py-2 mt-5">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
