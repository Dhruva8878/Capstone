import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./SignUp/Signup";
import { Signin } from "./Signin/Signin";

export const Login = () => {
  localStorage.removeItem("user_id");

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Signup />
          </div>
          <div className="col-md-6">
            <Signin />
          </div>
        </div>
      </div>
    </div>
  );
};
