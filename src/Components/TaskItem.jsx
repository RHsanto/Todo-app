/* eslint-disable react/prop-types */
// TaskItem.js

import { MdDelete, MdEdit, MdOutlineDoneOutline } from "react-icons/md";

const TaskItem = ({ item, onComplete, onDelete }) => {
  return (
    <div className="lg:flex justify-between gap-10 bg-white p-5 rounded mb-5">
      <div>
        <h2
          className={
            item.priority === "low"
              ? "bg-yellow-400 mb-2 w-20 rounded"
              : item.priority === "medium"
              ? "bg-orange-400 mb-2 w-20 rounded"
              : "bg-red-500 mb-2 w-20 rounded"
          }
        ></h2>
        <div className="flex gap-4 items-center">
          <h3 className="text-3xl font-bold ">{item.title}</h3>
          <div
            className={`${
              item.priority === "low"
                ? "bg-yellow-400"
                : item.priority === "medium"
                ? "bg-orange-400"
                : "bg-red-500"
            } px-3 rounded uppercase font-bold`}
          >
            <small>{item.priority}</small>
          </div>
        </div>
        <p className="mt-4 mb-10">{item.description}</p>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-blue-500 px-4 py-2 bg-blue-200 font-bold rounded">
            Edit <MdEdit />
          </button>
          <button
            className="flex items-center gap-1 text-red-500 px-4 py-2 bg-red-100 font-bold rounded"
            onClick={onDelete}
          >
            Delete <MdDelete />
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={onComplete}
          className="flex items-center gap-1 text-green-600 bg-green-200 py-2 px-4 font-bold rounded mt-5 lg:mt-0"
        >
          <MdOutlineDoneOutline /> <span>Done</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
