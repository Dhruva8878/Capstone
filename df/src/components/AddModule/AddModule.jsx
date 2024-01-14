import { Link, useNavigate } from "react-router-dom";
import "./AddModule.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlData } from "../../urlData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddModule = () => {
  localStorage.removeItem("user_id");

  const navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [simpData, setSimpData] = useState([]);
  const [matStatus, setMatStatus] = useState(false);

  useEffect(() => {
    axios.get(urlData + "course/fetchall").then((res) => {
      setCourseData(res.data.courseDetails);
    });

    axios
      .get(urlData + `module/fetch/${localStorage.getItem("module_id")}`)
      .then((res) => {
        setSimpData(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const HandleEdit = () => {
      formik.setFieldValue("courseTitle", simpData.course_title);
      formik.setFieldValue("moduleTitle", simpData.module_title);
      formik.setFieldValue("moduleDetails", simpData.details);
      formik.setFieldValue("noOfChapters", simpData.number_of_chapters);
      formik.setFieldValue("noOfQuestions", simpData.number_of_questions);
    };

    if ("module_id" in localStorage) {
      HandleEdit();
      setMatStatus(true);
    } else {
      setMatStatus(false);
    }
  }, [matStatus, simpData]);

  const validationSchema = Yup.object().shape({
    courseTitle: Yup.string().max(50, "course title must not exceed 50 characters").required("Course Title is required"),
    moduleTitle: Yup.string().trim() .min(10,"Module title must be of 10 characters").max(50, "Module Title must not exceed 50 characters").required("Module Title is required"),
    moduleDetails: Yup.string().trim() .min(10,"Module Details must be of 10 characters").max(50, "Module Details must not exceed 50 characters").required("Module Details is required"),
    noOfChapters: Yup.string().trim()
      .matches(/[0-9]/ ,"Chapters does not include alphatbets")
      .length(2, "Number Questions should be less than 100")
      .required("Number of Chapters is required"),
    noOfQuestions: Yup.string().trim()
    .matches(/[0-9]/ ,"Questions does not include alphatbets")
      .length(2, "Number Questions should be less than 100")
      .required("Number of Questions is required"),
  });

  const formik = useFormik({
    initialValues: {
      courseTitle: "",
      moduleTitle: "",
      moduleDetails: "",
      noOfChapters: "",
      noOfQuestions: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (matStatus) {
        const modData2 = {
          module_title: values.moduleTitle,
          course_title: values.courseTitle,
          details: values.moduleDetails,
          number_of_questions: values.noOfQuestions,
          number_of_chapters: values.noOfChapters,
          module_id: localStorage.getItem("module_id"),
        };

        axios
          .patch(urlData + "module/update", modData2)
          .then((res) => {
            console.log(res.data);
            toast.success("Module updated Successfully...!", {
              position: toast.POSITION.TOP_CENTER,
            });
            navigate('/modules')
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something Went Wrong...!", {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      } else {
        const modData = {
          module_title: values.moduleTitle,
          course_title: values.courseTitle,
          details: values.moduleDetails,
          number_of_questions: values.noOfQuestions,
          number_of_chapters: values.noOfChapters,
        };

        axios
          .post(urlData + "module/save", modData)
          .then((res) => {
            console.log(res.data);
            toast.success("Module Added Successfully...!", {
              position: toast.POSITION.TOP_CENTER,
            });
            navigate('/modules')
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something Went Wrong...!", {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      }
    },
  });

  return (
    <>
      <div className="container">
        <h1>Create Module</h1>
        <form onSubmit={formik.handleSubmit} id="frm" action="">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="">Course Title</label>
              <select
                id=""
                className="form-control"
                {...formik.getFieldProps("courseTitle")}
              >
                <option value="">
                  {matStatus ? formik.values.courseTitle : "Select Option"}
                </option>
                {courseData.map((e) => (
                  <option key={e.course_title} value={e.course_title}>
                    {e.course_title}
                  </option>
                ))}
              </select>
              {formik.touched.courseTitle && formik.errors.courseTitle && (
                <div className="error">
                  {formik.errors.courseTitle}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="">Module Title</label>
              <input
                className="form-control"
                type="text"
                {...formik.getFieldProps("moduleTitle")}
              />
              {formik.touched.moduleTitle && formik.errors.moduleTitle && (
                <div className="error">
                  {formik.errors.moduleTitle}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="">Module Details</label>
              <input
                className="form-control"
                type="text"
                {...formik.getFieldProps("moduleDetails")}
              />
              {formik.touched.moduleDetails && formik.errors.moduleDetails && (
                <div className="error">
                  {formik.errors.moduleDetails}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="">Module Profile Picture</label>
              <input
                className="form-control"
                type="file"
                disabled
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="">No. of Questions</label>
              <input
                className="form-control"
                type="text"
                {...formik.getFieldProps("noOfQuestions")}
              />
              {formik.touched.noOfQuestions && formik.errors.noOfQuestions && (
                <div className="error">
                  {formik.errors.noOfQuestions}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="">No. of Chapters</label>
              <input
                className="form-control"
                type="text"
                {...formik.getFieldProps("noOfChapters")}
              />
              {formik.touched.noOfChapters && formik.errors.noOfChapters && (
                <div className="error">
                  {formik.errors.noOfChapters}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <input type="submit" className="btn btn-success" />
              &nbsp;&nbsp;
              <Link to={"/modules"}>
                <button className="btn btn-danger">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
