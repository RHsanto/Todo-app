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
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs } = useSelector(state => state.jobs);
  const completeJobs = jobs.filter(job => job.completedOn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showJobs());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteJobs(id));
  };

  const handleTab = id => {
    dispatch(completeTask(id));
  };

  // Pagination Function
  const ITEMS_PER_PAGE = 10;
  const totalItems = Array.isArray(jobs) ? jobs.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto my-5">
      <div>
        {/* Task Header */}
        <div className="text-4xl font-bold flex items-center justify-center gap-2 my-5">
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
              {(activeTab === "all" ? jobs : completeJobs).slice(startIndex, endIndex).map(data => {
                const { id, title, desc, author, completedOn, userImg, priority } = data;
                return (
                  <tr key={id}>
                    <td className="p-2 border">
                      <input disabled={completedOn} onClick={() => handleTab(id)} type="checkbox" />
                    </td>
                    <td className="p-2 border">
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
                    <td className="p-2 border">{completedOn ? <s>{title}</s> : <>{title}</>}</td>
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
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex  items-center mt-4 gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded "
            >
              Prev
            </button>
            <div>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => changePage(index + 1)}
                  className={`px-4 py-2 mx-1  rounded ${
                    currentPage === index + 1 ? "bg-violet-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
