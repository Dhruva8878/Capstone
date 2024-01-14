import { Link, useNavigate } from "react-router-dom";
import "./AddMaterial.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlData } from "../../urlData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddMaterial = () => {
  localStorage.removeItem('user_id');
  const navigate = useNavigate();

  const [moduleData, setModuleData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [simpData, setSimpData] = useState([]);
  const [matStatus, setMatStatus] = useState(false);

  useEffect(() => {
    axios.get(urlData + "course/fetchall").then((res) => {
      setCourseData(res.data.courseDetails);
    });

    axios.get(urlData + "module/fetchall").then((res) => {
      setModuleData(res.data.moduleDetails);
    });

    axios.get(urlData + `material/fetch/${localStorage.getItem("material_id")}`)
      .then((res) => {
        setSimpData(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matStatus]);

  useEffect(() => {
    const handleEdit = () => {
      formik.setFieldValue("courseTitle", simpData.course_title);
      formik.setFieldValue("materialTitle", simpData.material_title);
      formik.setFieldValue("moduleTitle", simpData.module_title);
      formik.setFieldValue("materialDesc", simpData.material_details);
    };

    if ("material_id" in localStorage) {
      handleEdit();
      setMatStatus(true);
    } else {
      setMatStatus(false);
    }
  }, [matStatus, simpData]);

  const validationSchema = Yup.object().shape({
    courseTitle: Yup.string().trim().max(50, "Course Title must not exceed 50 characters").required("Course Title is required"),
    moduleTitle: Yup.string().trim().max(50, "Module Title must not exceed 50 characters").required("Module Title is required"),
    materialTitle: Yup.string().trim() .min(10,"Material Title must be of 10 characters").max(50, "Material title must not exceed 50 characters").required("Material Title is required"),
    materialDesc: Yup.string().trim() .min(10,"Material Description must be of 10 characters").max(50, "Material Description must not exceed 50 characters").required("Material Details is required"),
  });

  const formik = useFormik({
    initialValues: {
      courseTitle: "",
      moduleTitle: "",
      materialTitle: "",
      materialDesc: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const matData = {
        course_title: values.courseTitle,
        module_title: values.moduleTitle,
        material_title: values.materialTitle,
        material_description: values.materialDesc,
      };

      const matData2 = {
        course_title: values.courseTitle,
        module_title: values.moduleTitle,
        material_title: values.materialTitle,
        material_description: values.materialDesc,
        material_id: localStorage.getItem("material_id"),
      };

      if (matStatus === true) {
        toast.success('Material updated Successfully...!', { position: toast.POSITION.TOP_CENTER });

        axios.patch(urlData + "material/update", matData2)
          .then((res) => {
            console.log(res);
            navigate("/material")
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast.success('Material Added Successfully...!', { position: toast.POSITION.TOP_CENTER });
        axios.post(urlData + "material/save", matData)
          .then((res) => {
            console.log(res.data);
            navigate("/material")
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  return (
    <>
      <div className="container">
        <h1>Create Material</h1>

        <form onSubmit={formik.handleSubmit} id="frm" action="">
          <div className="row">
            <div className="col-md-6">
              <label>Course Title<span id="rd">*</span></label>
              <br />
              <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.courseTitle}
                name="courseTitle"
                className="form-control"
              >
                <option value="">{matStatus == true ? formik.values.courseTitle :"Select Option"}</option>
                {courseData.map((e) => (
                  <option value={e.course_title} key={e.course_title}>
                    {e.course_title}
                  </option>
                ))}
              </select>
              {formik.touched.courseTitle && formik.errors.courseTitle ? (
                <div className="error">{formik.errors.courseTitle}</div>
              ) : null}
            </div>
            <div className="col-md-6">
              <label>Module Title<span id="rd">*</span></label>
              <br />
              <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.moduleTitle}
                name="moduleTitle"
                className="form-control"
              >
                <option value="">{matStatus == true ? formik.values.moduleTitle :"Select Option"}</option>
                {moduleData.map((e) => (
                  <option value={e.module_title} key={e.module_title}>
                    {e.module_title}
                  </option>
                ))}
              </select>
              {formik.touched.moduleTitle && formik.errors.moduleTitle ? (
                <div className="error">{formik.errors.moduleTitle}</div>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Material Title<span id="rd">*</span></label>
              <br />
              <input
                className="form-control"
                type="text"
                name="materialTitle"
                value={formik.values.materialTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.materialTitle && formik.errors.materialTitle ? (
                <div className="error">{formik.errors.materialTitle}</div>
              ) : null}
            </div>
            <div className="col-md-6">
              <label>Material Details<span id="rd">*</span></label>
              <br />
              <input
                className="form-control"
                type="text"
                name="materialDesc"
                value={formik.values.materialDesc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.materialDesc && formik.errors.materialDesc ? (
                <div className="error">{formik.errors.materialDesc}</div>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <input type="submit" className="btn btn-success" />
              &nbsp;&nbsp;
              <Link to={"/material"}>
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
