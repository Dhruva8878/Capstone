import { Link, useNavigate } from "react-router-dom";
import "./AddCourses.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlData } from "../../urlData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddCourse = () => {
  localStorage.removeItem("user_id");
  const navigate = useNavigate();

  const [simpData, setSimpData] = useState([]);
  const [matStatus, setMatStatus] = useState(false);

  useEffect(() => {
    axios
      .get(urlData + `course/fetch/${localStorage.getItem("course_id")}`)
      .then((res) => {
        setSimpData(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matStatus]);

  useEffect(() => {
    const HandleEdit = () => {
      formik.setFieldValue("courseTitle", simpData.course_title);
      formik.setFieldValue("coursePrice", simpData.course_effective_price);
      formik.setFieldValue('courseDetails', simpData.course_details);
      formik.setFieldValue('courseEffectiveDate', simpData.info);
      formik.setFieldValue('ageGroup', simpData.age_group);
      formik.setFieldValue('aboutCourseDetails', simpData.about_course_details);
      formik.setFieldValue('courseDuration', simpData.duration_period);
      formik.setFieldValue('courseDescription', simpData.course_description);
      formik.setFieldValue('introduction', simpData.introduction);
      formik.setFieldValue('keywords', simpData.keywords);
    };

    if ("course_id" in localStorage) {
      HandleEdit();
      setMatStatus(true);
    } else {
      setMatStatus(false);
    }
  }, [matStatus, simpData]);

  const validationSchema = Yup.object({
    courseTitle: Yup.string().trim().required("Course Title is required")
    .min(10,"Course title must be of 10 characters")
    .max(50, "Course title must not exceed 50 characters"),
    coursePrice: Yup.string().trim() .min(10,"Course Price must be of 10 characters")
    .max(50, "Course Price must not exceed 50 characters")
    .matches(/^\d{1,}$/, "Please enter a valid Course Price").required("Course Price is required"),
    courseDetails: Yup.string().trim() .min(10,"Course details must be of 10 characters").max(50, "course details must not exceed 50 characters").required("Course Details is required"),
    courseEffectiveDate: Yup.string().required("Course Effective Date is required"),
    ageGroup: Yup.string().required("Age Group is required"),
    aboutCourseDetails: Yup.string().trim() .min(10,"About Course must be of 10 characters").max(50, "About Course must not exceed 50 characters").required("About Course Details is required"),
    courseDuration: Yup.string().required("Course Duration is required"),
    courseDescription: Yup.string().trim() .min(10,"Course Description must be of 10 characters").max(50, "Password must not exceed 50 characters").required("Course Description is required"),
    introduction: Yup.string().trim() .min(10,"Introduction must be of 10 characters").max(50, "Password must not exceed 50 characters").required("Introduction is required"),
    keywords: Yup.string().trim() .min(10,"Keywords must be of 10 characters").max(50, "Password must not exceed 50 characters").required("Keywords is required"),
  });

  const formik = useFormik({
    initialValues: {
      courseTitle: "",
      coursePrice: "",
      courseDetails: "",
      courseEffectiveDate: "",
      ageGroup: "",
      aboutCourseDetails: "",
      courseDuration: "",
      courseDescription: "",
      introduction: "",
      keywords: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (matStatus === true) {
        toast.success("Course updated Successfully...!", {
          position: toast.POSITION.TOP_CENTER,
        });

        let courseData2 = {
          course_title: values.courseTitle,
          course_effective_price: values.coursePrice,
          course_details: values.courseDetails,
          age_group: values.ageGroup,
          about_course_details: values.aboutCourseDetails,
          duration_period: values.courseDuration,
          course_description: values.courseDescription,
          introduction: values.introduction,
          keywords: values.keywords,
          course_id: localStorage.getItem("course_id"),
        };

        axios
          .patch(urlData + "course/update", courseData2)
          .then((res) => {
            console.log(res.data);
            navigate("/courses")
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast.success("Course Added Successfully...!", {
          position: toast.POSITION.TOP_CENTER,
        });

        let courseData = {
          course_title: values.courseTitle,
          course_effective_price: values.coursePrice,
          course_details: values.courseDetails,
          info: values.courseEffectiveDate,
          age_group: values.ageGroup,
          about_course_details: values.aboutCourseDetails,
          duration_period: values.courseDuration,
          course_description: values.courseDescription,
          introduction: values.introduction,
          keywords: values.keywords,
        };

        axios
          .post(urlData + "course/save", courseData)
          .then((res) => {
            console.log(res.data);
            navigate("/courses")
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(courseData);
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
  } = formik;

  return (
    <div className="container">
      <h1>Course</h1>
      <form onSubmit={handleSubmit} id="frm" action="">
        <div className="row">
          <div className="col-md-6">
            <label>Course Title<span id="rd">*</span></label>
            <br />
            <input
              className="form-control"
              type="text"
              id="courseTitle"
              name="courseTitle"
              value={values.courseTitle}
              onChange={handleChange}
            />
            {errors.courseTitle && touched.courseTitle && (
              <div className="error">{errors.courseTitle}</div>
            )}
          </div>
          <div className="col-md-6">
            <label>Course Price {"(Rs.)"}<span id="rd">*</span></label>
            <br />
            <input
              className="form-control"
              type="text"
              id="coursePrice"
              name="coursePrice"
              value={values.coursePrice}
              onChange={handleChange}
            />
            {errors.coursePrice && touched.coursePrice && (
              <div className="error">{errors.coursePrice}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Course Details<span id="rd">*</span></label>
            <br />
            <input
              className="form-control"
              type="text"
              id="courseDetails"
              name="courseDetails"
              value={values.courseDetails}
              onChange={handleChange}
            />
            {errors.courseDetails && touched.courseDetails && (
              <div className="error">{errors.courseDetails}</div>
            )}
          </div>
          <div className="col-md-6">
            <label>Course Effective Date<span id="rd">*</span></label>
            <br />
            <input
              className="form-control"
              type="date"
              id="courseEffectiveDate"
              name="courseEffectiveDate"
              value={values.courseEffectiveDate}
              onChange={handleChange}
            />
            {errors.courseEffectiveDate && touched.courseEffectiveDate && (
              <div className="error">{errors.courseEffectiveDate}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Age Group<span id="rd">*</span></label>
            <br />
            <select
              id="ageGroup"
              name="ageGroup"
              onChange={handleChange}
              className="form-control"
            >
              <option value="">{matStatus === true ? values.ageGroup : "Choose"}</option>
              <option value="11-20">11-20</option>
              <option value="21-30">21-30</option>
              <option value="31-40">31-40</option>
            </select>
            {errors.ageGroup && touched.ageGroup && (
              <div className="error">{errors.ageGroup}</div>
            )}
          </div>
          <div className="col-md-6">
            <label>About Course Details<span id="rd">*</span> </label>
            <br />
            <input
              className="form-control"
              type="text"
              id="aboutCourseDetails"
              name="aboutCourseDetails"
              value={values.aboutCourseDetails}
              onChange={handleChange}
            />
            {errors.aboutCourseDetails && touched.aboutCourseDetails && (
              <div className="error">{errors.aboutCourseDetails}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Course Duration<span id="rd">*</span></label>
            <br />
            <select
              id="courseDuration"
              name="courseDuration"
              onChange={handleChange}
              className="form-control"
            >
              <option value="">{matStatus === true ? values.courseDuration : "Choose"}</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="9 months">9 Months</option>
            </select>
            {errors.courseDuration && touched.courseDuration && (
              <div className="error">{errors.courseDuration}</div>
            )}
          </div>
          <div className="col-md-6">
            <label>Course Description<span id="rd">*</span> </label>
            <br />
            <input
              className="form-control"
              type="text"
              id="courseDescription"
              name="courseDescription"
              value={values.courseDescription}
              onChange={handleChange}
            />
            {errors.courseDescription && touched.courseDescription && (
              <div className="error">{errors.courseDescription}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Introduction<span id="rd">*</span></label>
            <br />
            <input
              className="form-control"
              type="text"
              id="introduction"
              name="introduction"
              value={values.introduction}
              onChange={handleChange}
            />
            {errors.introduction && touched.introduction && (
              <div className="error">{errors.introduction}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label> Keywords<span id="rd">*</span></label>
            <br />
            <input
              className="form-control"
              type="text"
              id="keywords"
              name="keywords"
              value={values.keywords}
              onChange={handleChange}
            />
            {errors.keywords && touched.keywords && (
              <div className="error">{errors.keywords}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <input type="submit" className="btn btn-success" />
            &nbsp;&nbsp;
            <Link to={"/courses"}>
              <button className="btn btn-danger">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCourse;
