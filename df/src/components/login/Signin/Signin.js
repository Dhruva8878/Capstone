import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { urlData } from "../../../urlData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from "formik";
import * as Yup from "yup";

export const Signin = () => {
  localStorage.removeItem("user_id");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must not exceed 16 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const userDetails = { email: values.email, password: values.password };

      axios
        .post(urlData + "user/login", userDetails)
        .then((response) => {
          if (response.data.token === "error") {
            let msg = document.getElementById("logMsg");
            toast.error("Login Unsuccessfull...!", {
              position: toast.POSITION.TOP_CENTER,
            });
            msg.innerHTML = "Invalid user or verify your account....";
            msg.style.color = "red";
          } else {
            const obj = response.data.userDeatails[0];
            console.log(response);
            toast.success("Login Successfull...!", {
              position: toast.POSITION.TOP_CENTER,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_id", obj.user_id);
            localStorage.setItem("email", obj.email);
            localStorage.setItem("role", obj.role);
            obj.role === "admin" ? navigate("/myprofile") : navigate("/home");
          }
        })
        .catch((err) => {
          toast.error("Wrong Creadentials Login unsuccessfull...!", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(err);
        });
    },
  });

  return (
    <>
      <div id="log" className="form-group">
        <h1>Login</h1>
        <h4 id="logMsg"></h4>
        <form onSubmit={formik.handleSubmit} action="">
          <div>
            <label>
              {" "}
              Email<span className="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Enter Email"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label>
              {" "}
              Password<span className="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Enter Password"
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <div>
            <Link to={"/reset"}>
              <p>Forgot Password?</p>
            </Link>
          </div>
          <div>
            <input type="submit" className="btn btn-danger" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
