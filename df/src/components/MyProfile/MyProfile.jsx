import { useEffect, useState } from "react";
import "./myprofile.css";
import axios from "axios";
import * as Yup from "yup";
import { urlData } from "../../urlData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { ChangePass } from "./ChangePass/Changepass";

export const MyProfile = () => {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Invalid name")
      .max(50, "Password must not exceed 50 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Invalid name")
      .max(50, "Password must not exceed 50 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .required("Mobile Number is required")
      .matches(/^\d{4,}$/, "Please enter a valid phone number")
      .length(10, "Mobile should of 10 digits"),
    address1: Yup.string().required("Address1 is required")
      .max(100, "Password must not exceed 100 characters"),
    address2: Yup.string().required("Address2 is required")
    .max(100, "Password must not exceed 100 characters"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    pincode: Yup.string()
      .matches(/[0-9]/, "Please enter a valid pincode number")
      .min(6, "Password must be at least 6 characters")
      .max(8, "Password must not exceed 8 characters")
      .required("Pincode is required"),
    Gender: Yup.string().required("Gender is required")
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      contact: "",
      Gender: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      oldPass: "",
      newPass: "",
      npass2: "",
    },
    validationSchema,

    onSubmit: (values) => {


      const details = {
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        email: values.email,
        mobile: values.contact,
        gender: values.Gender,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,
      };

      axios
        .patch(urlData + "user/update", details)
        .then((res) => {
          console.log(res);
          toast.success("Profile Updated Successfully...!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const [userData, setUserData] = useState([]);
  const [userData2, setUserData2] = useState([]);
  const [useStatus, setUseStatus] = useState(false);

  useEffect(() => {
    const HandelEdit = () => {
      formik.setFieldValue("firstName", userData.first_name);
      formik.setFieldValue("middleName", userData.middle_name);
      formik.setFieldValue("lastName", userData.last_name);
      formik.setFieldValue("email", userData.email);
      formik.setFieldValue("contact", userData.mobile);
      if (userData.address1 == null) {
      } else {
        formik.setFieldValue("Gender", userData.gender);
        formik.setFieldValue("address1", userData.address1);
        formik.setFieldValue("address2", userData.address2);
        formik.setFieldValue("city", userData.city);
        formik.setFieldValue("state", userData.state);
        formik.setFieldValue("country", userData.country);
        formik.setFieldValue("pincode", userData.pincode);
      }
    };
    const HandleField = () => {
      formik.setFieldValue("firstName", userData2.first_name);
      formik.setFieldValue("middleName", userData2.middle_name);
      formik.setFieldValue("lastName", userData2.last_name);
      formik.setFieldValue("email", userData2.email);
      formik.setFieldValue("contact", userData2.mobile);

      if (userData2.address1 == null) {
      } else {
        formik.setFieldValue("Gender", userData2.gender);
        formik.setFieldValue("address1", userData2.address1);
        formik.setFieldValue("address2", userData2.address2);
        formik.setFieldValue("city", userData2.city);
        formik.setFieldValue("state", userData2.state);
        formik.setFieldValue("country", userData2.country);
        formik.setFieldValue("pincode", userData2.pincode);
      }
    };

    if ("user_id" in localStorage) {
      HandelEdit();
      setUseStatus(true);
    } else if (
      "email" in localStorage &&
      localStorage.getItem("user_id") == null
    ) {
      HandleField();
      setUseStatus(true);
    } else {
      setUseStatus(false);
    }
  }, [useStatus, userData, userData2]);

  useEffect(() => {
    axios
      .get(urlData + `user/fetchByEmail/${localStorage.getItem("email")}`)
      .then((res) => {
        setUserData2(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(urlData + `user/fetch/${localStorage.getItem("user_id")}`)
      .then((res) => {
        setUserData(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [useStatus]);




  return (
    <div className="container-fluid" id="regi">
      <h1>Edit Profile</h1>
      <div className="container">
        <form onSubmit={formik.handleSubmit} id="regi_1">
          <div className="row">
            <div className="form-group col-md-6">
              <label>
                {" "}
                First Name <span id="rd">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Enter First Name"
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label> Middle Name</label>
              <input
                className="form-control"
                placeholder="Enter Middle Name"
                type="text"
                id="middleName"
                name="middleName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.middleName}
              />
              {formik.touched.middleName && formik.errors.middleName && (
                <div className="error">{formik.errors.middleName}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="lastName">
                Last Name<span id="rd">*</span>
              </label>
              <input
                id="lastName"
                className={`form-control ${formik.errors.lastName && formik.touched.lastName
                  ? "is-invalid"
                  : ""
                  }`}
                placeholder="Enter Last Name"
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">
                Email<span id="rd">*</span>
              </label>
              <input
                id="email"
                className="form-control"
                placeholder="Enter Email"
                type="text"
                disabled
                name="email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label>
                {" "}
                Mobile Number<span id="rd">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Enter Mobile Number"
                type="text"
                name="contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="error">{formik.errors.contact}</div>
              )}
            </div>

            <div className="form-check col-md-6">
              <label style={{ marginLeft: "-12px" }}>
                Gender<span id="rd">*</span>
              </label>
              <div style={{ display: "flex", paddingTop: "8px" }}>
                <div>
                  <span>Male </span>
                  <input
                    style={{ marginLeft: "3px" }}
                    className="form-check-input"
                    type="radio"
                    value="male"
                    name="gender"
                    onChange={(e) => formik.setFieldValue("Gender", e.target.value)}
                    onBlur={formik.handleBlur}
                    checked={formik.values.Gender === "male"}
                  />
                </div>

                <div>
                  <span>Female </span>
                  <input
                    style={{ marginLeft: "3px" }}
                    className="form-check-input"
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={(e) => formik.setFieldValue("Gender", e.target.value)}
                    onBlur={formik.handleBlur}
                    checked={formik.values.Gender === "female"}
                  />
                </div>
              </div>
              {formik.touched.Gender && formik.errors.Gender && (
                <div className="error">{formik.errors.Gender}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label>
                {" "}
                Address1<span id="rd">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="address1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address1}
              />
              {formik.touched.address1 && formik.errors.address1 && (
                <div className="error">{formik.errors.address1}</div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label>
                {" "}
                Address2<span id="rd">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="address2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address2}
              />
              {formik.touched.address2 && formik.errors.address2 && (
                <div className="error">{formik.errors.address2}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>
                {" "}
                Country<span id="rd">*</span>
              </label>
              <select
                className="form-control"
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              >
                <option value="">
                  {useStatus == true ? formik.values.country : "Choose Country"}
                </option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="China">China</option>
              </select>
              {formik.touched.country && formik.errors.country && (
                <div className="error">{formik.errors.country}</div>
              )}
            </div>

            <div className="col-md-6">
              <label>
                {" "}
                State<span id="rd">*</span>
              </label>
              <select
                className="form-control"
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}>
                <option value="">
                  {useStatus == true ? formik.values.state : "Choose State"}
                </option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Kashmir">Kashmir</option>
              </select>
              {formik.touched.state && formik.errors.state && (
                <div className="error">{formik.errors.state}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>
                {" "}
                City<span id="rd">*</span>
              </label>
              <select
                className="form-control"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              >
                <option value="">
                  {useStatus == true ? formik.values.city : "Choose City"}
                </option>
                <option value="Indore">Indore</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Khargone">Khargone</option>
                <option value="Ujjain">Ujjain</option>
                <option value="Sehore">Sehore</option>
                <option value="Pune">Pune</option>
              </select>
              {formik.touched.city && formik.errors.city && (
                <div className="error">{formik.errors.city}</div>
              )}
            </div>
            <div className="col-md-6">
              <label>
                {" "}
                Pincode<span id="rd">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Enter Pincode Number"
                type="text"
                name="pincode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pincode}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="error">{formik.errors.pincode}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4"></div>
            <div style={{ textAlign: "center" }} className="col-md-4">
              <input type="submit" className="btn btn-success" />
            </div>
            <div className="col-md-4"></div>
          </div>
        </form>
      </div>

      <hr />

      <div className="container">
        <h2>Change Password</h2>
        <ChangePass email={formik.values.email} />
      </div>
      <ToastContainer />
    </div>
  );
};
