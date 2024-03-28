import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementFive, reset } from "../Redux/Slice/counterSlice";

const Counter = () => {
  const count = useSelector(state => state.counter.count);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };
  const handleFive = () => {
    dispatch(incrementFive(10));
  };
  return (
    <div className="mt-10  text-center">
      <h1 className="border w-2/12 mx-auto p-4 rounded text-2xl">
        Counter : <b>{count}</b>
      </h1>
      <button onClick={handleIncrement} className="mt-10 bg-sky-500 p-3 rounded text-white">
        Increment +
      </button>
      <button onClick={handleDecrement} className="mt-10 ml-5 bg-red-500 p-3 rounded text-white">
        Decrement -
      </button>
      <button onClick={handleReset} className="mt-10 ml-5 bg-green-500 p-3 rounded text-white">
        Reset
      </button>
      <button onClick={handleFive} className="mt-10 ml-5 bg-yellow-400 p-3 rounded text-white">
        Increment by 5
      </button>
    </div>
  );
};

export default Counter;
