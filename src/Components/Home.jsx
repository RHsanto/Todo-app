import { SiTask } from "react-icons/si";
import {
  MdDelete,
  MdModeEdit,
  MdOutlineAdd,
  MdOutlineAttractions,
  MdOutlineDateRange,
  MdOutlineDoneAll,
} from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTasks, FaUser } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteJobs, showJobs } from "../Redux/Slice/jobSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { jobs } = useSelector(state => state.jobs);
  console.log(jobs);

  useEffect(() => {
    dispatch(showJobs());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteJobs(id));
  };

  const handleTab = id => {
    dispatch(completeTask(id));
  };

  const completeJobs = jobs.filter(job => job.completedOn);

  return (
    <div className="container mx-auto my-5">
      <div>
        {/* Task Header */}
        <div className="text-4xl font-bold flex items-center justify-center gap-2 my-10">
          <SiTask className="text-orange-400" />
          <h1>Daily Tasks</h1>
        </div>
        {/* Task table */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border-2 p-1  rounded outline-none cursor-pointer"
              >
                <option value="all">All</option>
                <option value="complete">Completed</option>
              </select>
            </div>
            <div>
              <Link to="/add-todo">
                <button className="flex  items-center gap-2 bg-violet-500 px-4 py-2 text-white rounded">
                  Add <MdOutlineAdd className="text-2xl" />{" "}
                </button>
              </Link>
            </div>
          </div>
          <table className="w-full border text-center">
            <thead className="border ">
              <tr>
                <th className="p-3 border">NO</th>
                <th className=" border ">
                  <div className="flex items-center gap-2 justify-center">
                    <BiLoaderCircle className="text-xl" /> Status
                  </div>
                </th>
                <th className="border">
                  <div className="flex items-center gap-2 justify-center">
                    <FaUser className="text-xl" />
                    Author
                  </div>
                </th>
                <th className="border">
                  <div className="flex items-center gap-2 justify-center">
                    <FaTasks className="text-xl" /> Task Name
                  </div>
                </th>
                <th className="border">
                  <div className="flex items-center gap-2 justify-center">
                    <MdOutlineDateRange className="text-xl" />
                    <span>Date</span>
                  </div>
                </th>
                <th className="border">
                  <div className="flex items-center gap-2 justify-center">
                    <FaArrowUpRightDots className="text-xl" />
                    Priority
                  </div>
                </th>
                <th className="border">
                  <div className="flex items-center gap-2 justify-center">
                    <MdOutlineAttractions className="text-xl" /> Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeTab === "all" && (
                <>
                  {jobs?.map(data => {
                    const { id, title, desc, author, completedOn, userImg, priority } = data;
                    return (
                      <tr key={id + 1}>
                        <td className="p-2 border ">
                          {completedOn ? (
                            <input type="checkbox" disabled />
                          ) : (
                            <input
                              onClick={() => handleTab(id)}
                              type="checkbox"
                              className="cursor-pointer ml-2"
                            />
                          )}
                        </td>
                        <td className="p-2 border  ">
                          {completedOn ? (
                            <div className="text-green-600 flex justify-center items-center gap-3">
                              <MdOutlineDoneAll />
                              Done
                            </div>
                          ) : (
                            <div className="flex justify-center items-center gap-2 text-orange-500">
                              {" "}
                              <BiLoaderCircle /> In Process
                            </div>
                          )}
                        </td>
                        <td className="p-2 border">
                          <div className="flex gap-2 items-center justify-center">
                            <img className="w-10  rounded-lg" src={userImg} alt="img" />
                            {author}
                          </div>
                        </td>
                        <td className="p-2 border">
                          {completedOn ? <s>{title}</s> : <>{title}</>}
                        </td>
                        <td className="p-2 border">
                          {completedOn ? <div>{completedOn}</div> : <div>Incomplete</div>}
                        </td>
                        <td className="p-2 border ">
                          <button
                            className={`${
                              priority === "Low"
                                ? " bg-yellow-300  "
                                : priority === "Medium"
                                ? " bg-orange-300 "
                                : " bg-red-300 "
                            } p-1 px-4 rounded`}
                          >
                            {priority || "Low"}
                          </button>
                        </td>
                        <td className="p-2 border">
                          <div className="flex items-center gap-4 justify-center">
                            {completedOn ? (
                              ""
                            ) : (
                              <Link to="/edit-todo" state={{ id, title, desc, priority }}>
                                <button className="bg-sky-100 text-sky-600 py-2 px-2 rounded ">
                                  <MdModeEdit className="text-xl" />
                                </button>
                              </Link>
                            )}

                            <button
                              onClick={() => {
                                handleDelete(id);
                              }}
                              className="bg-red-100 text-red-600 py-2 px-2 rounded "
                            >
                              <MdDelete className="text-xl" />
                            </button>
                            {/* <button className="bg-green-100 text-green-600 py-2 px-2 rounded">
                          <MdFileDownloadDone className="text-xl" />
                        </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
              {activeTab === "complete" && (
                <>
                  {completeJobs?.map((data, index) => {
                    const { id, title, author, completedOn, userImg, priority } = data;
                    return (
                      <tr key={id + 1}>
                        <td className="p-2 border ">{index + 1}</td>
                        <td className="p-2 border ">
                          <button className="bg-green-200 py-1 px-4 rounded"> Done</button>
                        </td>
                        <td className="p-2 border">
                          <div className="flex gap-2 items-center justify-center">
                            <img className="w-10  rounded-lg" src={userImg} alt="img" />
                            {author}
                          </div>
                        </td>
                        <td className="p-2 border">
                          <s>{title}</s>
                        </td>
                        <td className="p-2 border">{completedOn}</td>
                        <td className="p-2 border ">
                          <button
                            className={`${
                              priority === "low"
                                ? " bg-yellow-100  "
                                : priority === "medium"
                                ? " bg-orange-200 "
                                : " bg-red-200 "
                            } p-1 px-4 rounded`}
                          >
                            {priority || "Low"}
                          </button>
                        </td>
                        <td className="p-2 border">
                          <button
                            onClick={() => {
                              handleDelete(id);
                            }}
                            className="bg-red-100 text-red-600 py-2 px-2 rounded "
                          >
                            <MdDelete className="text-xl" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
