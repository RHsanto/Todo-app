import { useDispatch } from "react-redux";
import { addJobs } from "../../Redux/Slice/jobSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";

const AddTask = () => {
  const { user } = useFirebase();
  const author = user?.displayName?.split(" ")[0];
  const userImg = user?.photoURL;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const jobs = { id: uuidv4(), title, desc, author, userImg, priority };
    dispatch(addJobs(jobs));
    setDesc("");
    setTitle("");
    console.log(jobs);
    navigate("/");
  };

  return (
    <div className="my-10 container mx-auto w-2/6">
      <h1 className="text-2xl font-bold text-center">Add Jobs</h1>

      <div className="mt-4">
        <label>Title:</label> <br />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          className="outline-none border-2 p-2 w-full mb-4"
          placeholder="Title"
        />{" "}
        <br />
        <label>Priority :</label> <br />
        <select
          required
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="outline-none border-2 p-2 w-full mb-4"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <br />
        <label>Description:</label> <br />
        <textarea
          cols="24"
          rows="10"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="outline-none border-2 p-2  w-full"
          placeholder="Description"
        />{" "}
        <br />
        <button
          disabled={!title || !desc}
          onClick={handleSubmit}
          className="border bg-sky-500 py-2 px-6 rounded text-white mt-4 w-full"
        >
          Add Jobs
        </button>
      </div>
    </div>
  );
};

export default AddTask;
