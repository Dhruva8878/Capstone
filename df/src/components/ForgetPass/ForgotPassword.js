import { useFormik } from "formik";
import * as Yup from "yup";
import "./Forget.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urlData } from "../../urlData";
import { ToastContainer, toast } from "react-toastify";

export const ForgetPassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").lowercase().required("Email is required"),
    password: Yup.string().trim()
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      let obj = {
        email: values.email,
        password: values.password,
      };

      axios
        .patch(urlData + "user/forgetpass", obj)
        .then((res) => {
          console.log(res.data);
          toast.success("Password updated Successfully...!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.info("Wrong Credentials...!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    },
  });

  const HandleCancel = () => {
    navigate("/");
  };

  const Handlelog = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <h1>Reset Password</h1>

        <form className="form-control" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label>
                Email<span className="rd">*</span>
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="Enter Email "
                id="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>
                New Password<span className="rd">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter New Password "
                id="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              &nbsp;&nbsp;
              <button onClick={HandleCancel} className="btn btn-danger">
                Cancel
              </button>
              &nbsp;&nbsp;
              <button onClick={Handlelog} className="btn btn-danger">
                Login
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
