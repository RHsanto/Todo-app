/* eslint-disable react/prop-types */
const TaskList = ({ tasks, handleEdit, handleDelete }) => {
  console.log(tasks);
  return (
    <div>
      <h1>Hello World</h1>
      {tasks?.map(todo => (
        <div key={todo?.id} className="border p-5 my-5 w-2/5">
          <h1>{todo?.title}</h1>
          <h1>{todo?.description}</h1>
          <h1>{todo?.priority}</h1>
          <button className="bg-blue-500 px-4 py-2" onClick={() => handleEdit(todo.id)}>
            Edit
          </button>
          <button className="bg-red-500 px-4 py-2" onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
