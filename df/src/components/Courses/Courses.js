import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import { urlData } from "../../urlData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Courses = () => {
  const [status, setStatus] = useState(true);

  localStorage.removeItem("course_id");
  localStorage.removeItem("user_id");

  $(document).ready(function () {
    $("#myTable").DataTable();
  });

  const [coursesData, setCoursesData] = useState([]);
  const navigate = useNavigate();

  const handledel = (course_id) => {
    axios
      .delete(urlData + `course/delete/${course_id}`)
      .then((res) => {
        console.log(res);
        setStatus(!status);
        toast.error("Course Deleted Successfully...!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);
        setStatus(!status);
        toast.error('Something went wrong',{position: toast.POSITION.TOP_CENTER})

      });
  };

  const HandleEdit = (val) => {
    navigate("/addCourse");
    localStorage.setItem("course_id", val);
  };

  const HandleStatus = (val1, val2) => {
    let values = {
      course_id: val1,
      status: val2,
    };

    axios
      .patch(urlData + "course/manage", values)
      .then((res) => {
        res.data.statusCode == 1
          ? toast.success("Course Activated Successfully...!", {
              position: toast.POSITION.TOP_CENTER,
            })
          : toast.success("Course Deactivated Successfully...!", {
              position: toast.POSITION.TOP_CENTER,
            });
        console.log(res.data);
        setStatus(!status);
      })
      .catch((err) => {
        console.log(err);
        setStatus(!status);
      });
  };

  const HandleAddCourse = () => {
    navigate("/addcourse");
  };

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(urlData + "course/fetchall")
        .then((res) => setCoursesData(res.data.courseDetails));
    }, 10);
  }, [status]);

  return (
    <div id="cos" className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h1>Courses</h1>
        </div>
        <div className="col-md-6">
          <button onClick={HandleAddCourse} className="btn btn-danger pull-right">
            Add Courses
          </button>
        </div>
      </div>

      <div className="row">
        {coursesData.length > 0 && (
          <table
            id="myTable"
            className="display table table-bordered table-hover"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Course Title</th>
                <th>Age Group</th>
                <th>Duration Period</th>
                <th>Price (Rs.)</th>
                <th>Effective Date</th>
                <th>Course Details</th>
                <th>Course Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {coursesData.map((e) => (
                <tr>
                  <td>{e.course_id}</td>
                  <td>{e.course_title}</td>
                  <td>{e.age_group}</td>
                  <td>{e.duration_period}</td>
                  <td>{e.course_effective_price}</td>
                  <td>{(e.info + "").slice(0, 15)}</td>
                  <td>{e.about_course_details}</td>
                  <td>{e.course_description}</td>
                  <td>
                    <i
                      onClick={() => handledel(e.course_id)}
                      className="fa fa-trash"
                      style={{
                        color: "red",
                        fontSize: "25px",
                        marginLeft: "10px",
                      }}
                    />
                    <i
                      onClick={() => HandleEdit(e.course_id)}
                      className="bi bi-pencil"
                      style={{
                        color: "blue",
                        fontSize: "25px",
                        marginLeft: "10px",
                      }}
                    />
                    {e.status == 0 ? (
                      <i
                        onClick={() => HandleStatus(e.course_id, e.status)}
                        className="fa fa-check"
                        style={{
                          color: "green",
                          fontSize: "30px",
                          marginLeft: "10px",
                        }}
                      />
                    ) : (
                      <i
                        onClick={() => HandleStatus(e.course_id, e.status)}
                        className="fa fa-remove"
                        style={{
                          color: "red",
                          fontSize: "30px",
                          marginLeft: "10px",
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
