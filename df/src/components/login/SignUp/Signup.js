import axios from "axios";
import { urlData } from "../../../urlData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  localStorage.removeItem("user_id");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      cpass: "",
      gender: "",
      phone: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      first_name: Yup.string().trim() .min(2,"First Name must be of 2 characters")
        .required("Please Enter First Name")
        .matches(/^[a-zA-Z\s]*$/, "Invalid name")
        .max(50, "Password must not exceed 50 characters"),
      last_name: Yup.string().trim() .min(2,"Last Name  must be of 2 characters")
        .required("Please Enter Last Name")
        .matches(/^[a-zA-Z\s]*$/, "Invalid name")
        .max(50, "Password must not exceed 50 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .max(50, "Password must not exceed 50 characters"),
      gender: Yup.string().required("Gender is required"),
      phone: Yup.string()
        .required("Mobile Number is required")
        .matches(/^\d{4,}$/, "Please enter a valid phone number")
        .length(10, "Mobile should of 10 digits"),
      password: Yup.string()
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must not exceed 16 characters")
        .required("Password is required"),
      cpass: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
     
      const userData = {
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        mobile: values.phone,
        gender: values.gender,
      };

      axios
        .post(urlData + "user/save", userData)
        .then((res) => {
          console.log(res.data);
          toast.success("SignUp Successfull...!", {
            position: toast.POSITION.TOP_CENTER,
          });
          formik.setFieldValue("first_name" ,"")
          formik.setFieldValue("middle_name" ,"")
          formik.setFieldValue("last_name" ,"")
          formik.setFieldValue("email" ,"")
          formik.setFieldValue("phone" ,"")
          formik.setFieldValue("password" ,"")
          formik.setFieldValue("cpass" ,"")

        })
        .catch((err) => {
          err.response.data.error.code == "ER_DUP_ENTRY" ?toast.error(err.response.data.error.sqlMessage, {
            position: toast.POSITION.TOP_CENTER,}) : toast.error("SignUp Unsuccessfull...!", {
              position: toast.POSITION.TOP_CENTER,
            });
        });

      console.log("Signup successfull");
    },
  });

  return (
    <>
      <div id="sign" className="form-group ">
        <h1>Register</h1>
        <h3 id="signMsg"></h3>
        <form onSubmit={formik.handleSubmit} action="">
          <div className="form-group ">
            <label>
              {" "}
              First Name <span id="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Enter First Name"
              type="text"
              id="first_name"
              name="first_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="error">{formik.errors.first_name}</div>
            )}
          </div>
          <div>
            <label>Middle Name</label>
            <input
              className="form-control"
              placeholder="Enter Middle Name"
              type="text"
              id="middle_name"
              name="middle_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.middle_name}
            />
            {formik.touched.middle_name && formik.errors.middle_name && (
              <div className="error">{formik.errors.middle_name}</div>
            )}
          </div>
          <div>
            <label>
              Last Name<span className="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Enter Last Name"
              type="text"
              id="last_name"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="error">{formik.errors.last_name}</div>
            )}
          </div>

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
              Mobile Number<span className="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Enter Mobile Number"
              type="text"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
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
            <label>
              Confirm Password<span className="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Confirm Password"
              type="password"
              id="cpass"
              name="cpass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cpass}
            />
            {formik.touched.cpass && formik.errors.cpass && (
              <div className="error">{formik.errors.cpass}</div>
            )}
          </div>

          <div>
            <label>
              Gender<span className="rd">*</span>
            </label>

            <div style={{ display: "flex" }}>
              <div>
                <span>Male </span>
                <input
                  style={{ marginLeft: "3px" }}
                  className="form-check-input"
                  type="radio"
                  value="male"
                  name="gender"
                  id="gender"
                  onChange={(e) =>
                    formik.setFieldValue("gender", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === "male"}
                />
              </div>

              <div style={{ marginLeft: "3px" }}>
                <span>Female </span>
                <input
                  className="form-check-input"
                  type="radio"
                  checked={formik.values.gender === "female"}
                  name="gender"
                  id="gender"
                  value="female"
                  onChange={(e) =>
                    formik.setFieldValue("gender", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <div className="error">{formik.errors.gender}</div>
              )}
            </div>
          </div>

          <div>
            <Link to={"/home"}>
              <button type="button" className="btn btn-danger">
                Home
              </button>
            </Link>
            &nbsp;&nbsp;
            <input type="submit" className="btn btn-success" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
