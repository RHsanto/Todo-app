/* eslint-disable no-unused-vars */
import { login } from "../Redux/Slice/authSlice";
import useFirebase from "../hooks/useFirebase";
import { useDispatch } from "react-redux";
import google from "../assets/img/google.png";

const Navbar = () => {
  // Hooks
  const { signInUsingGoogle, user, logOut } = useFirebase();
  const dispatch = useDispatch();

  // Event handlers
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInUsingGoogle();
      const user = result?.user;
      dispatch(login());
    } catch (error) {
      console.error("Error occurred during Google sign in:", error);
    }
  };

  // Rendering
  return (
    <div className="bg-slate-100 p-4 rounded">
      <div className="flex justify-between items-center">
        <div>
          <b>TODO LIST</b>
        </div>
        <div className="flex items-center gap-4">
          {user?.email ? (
            <>
              <button className="bg-white py-2 px-4 rounded">
                {user?.displayName.split(" ")[0]}
              </button>
              <button onClick={logOut} className="bg-red-500 py-2 px-4 text-white rounded">
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="flex gap-2 items-center py-2 px-5 shadow bg-white rounded"
            >
              Sign in with
              <img src={google} alt="google" className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
