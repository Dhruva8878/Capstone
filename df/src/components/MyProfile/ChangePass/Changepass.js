import axios from "axios";
import * as Yup from "yup";
import { urlData } from "../../../urlData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik, validateYupSchema } from "formik";

export const ChangePass = ({email}) => {

   

  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
      npass2: "",
    },
    validationSchema:Yup.object().shape({
      oldPass: Yup.string().required("Old Password is required"),
      newPass: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must not exceed 16 characters")
        .required("New Password is required"),
      npass2: Yup.string()
        .oneOf([Yup.ref("newPass"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),

    onSubmit: (values) => {
        console.log("Hdkjsh");
      axios
        .patch(urlData + "user/pass", {
          email: email,
          oldpass: values.oldPass,
          newpass: values.newPass,
        })
        .then((res) => {
          console.log(res.data);
          toast.info("Password Updated Successfully...!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.info(
            "Password Cannot Be Updated Due to Wrong Credentials...!",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} id="regi2" action="">
        <div className="row">
          <div className="col-md-6">
            <label>
              {" "}
              Old Password<span id="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Old Password"
              type="text"
              name="oldPass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPass}
            />
            {formik.touched.oldPass && formik.errors.oldPass && (
                <div className="error">{formik.errors.oldPass}</div>
              )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>
              {" "}
              New Password<span id="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="New Password"
              type="text"
              name="newPass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPass}
            />
            {formik.touched.newPass && formik.errors.newPass && (
                <div className="error">{formik.errors.newPass}</div>
              )}
            <span className="rd" id="pwd1"></span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>
              {" "}
              Confirm Password<span id="rd">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Confirm Password"
              type="text"
              name="npass2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.npass2}
            />
            {formik.touched.npass2 && formik.errors.npass2 && (
                <div className="error">{formik.errors.npass2}</div>
              )}
            <span className="rd" id="pwd2"></span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <input type="submit" className="btn btn-success" />
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};
