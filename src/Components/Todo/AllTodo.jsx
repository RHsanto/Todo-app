import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteJobs, showJobs } from "../../Redux/Slice/jobSlice";
import { Link } from "react-router-dom";

const AllTodo = () => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { jobs, completeJobs } = useSelector(state => state.jobs);

  console.log(completeJobs);

  useEffect(() => {
    dispatch(showJobs());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteJobs(id));
  };
  // const handleCompleteJobDelete = id => {
  //   dispatch(deleteCompleteJob(id));
  // };
  const handleTab = id => {
    dispatch(completeTask(id));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl mt-5 text-center">All Todo</h1>
      <div className="flex justify-between">
        <button
          onClick={() => setActiveTab("all")}
          className="border bg-sky-500 py-2 px-6 rounded text-white"
        >
          All Jobs ({jobs?.length})
        </button>
        <button
          onClick={() => setActiveTab("complete")}
          className="border bg-green-600 py-2 px-6 rounded text-white"
        >
          Completed Jobs ({completeJobs?.length})
        </button>
      </div>
      {activeTab === "all" && (
        <div className="grid grid-cols-4 gap-4">
          {jobs?.map(data => {
            const { id, title, desc, author } = data;
            return (
              <div key={id + 1} className="col-span-1">
                <div className="p-4 my-4 border-2 rounded">
                  <h1>{title}</h1>
                  <p>{desc}</p>
                  <p>
                    Author : <b>{author}</b>
                  </p>
                  <div className="flex mt-4 gap-2">
                    <Link to="/edit-todo" state={{ id, title, desc }}>
                      <button className="border bg-green-500 py-2 px-6 rounded text-white">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(id);
                      }}
                      className="border bg-red-500 py-2 px-6 rounded text-white"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleTab(id)}
                      className="border bg-yellow-500 py-2 px-6 rounded text-white"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "complete" && (
        <div className="grid grid-cols-5 gap-4">
          {completeJobs?.map(data => {
            const { id, title, desc, author, completedOn } = data;
            return (
              <div key={id + 1} className="col-span-1">
                <div className="p-4 my-4 border-2 rounded">
                  <h1>{title}</h1>
                  <p>{desc}</p>
                  <p>
                    Author : <b>{author}</b>
                  </p>
                  <div className="flex mt-4 gap-2">
                    <button className="border bg-red-500 py-2 px-6 rounded text-white">
                      Delete
                    </button>
                    <button className="border py-2 px-6 rounded ">{completedOn}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllTodo;
