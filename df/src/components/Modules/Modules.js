import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Module.css";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import { urlData } from "../../urlData";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Modules = () => {
  const [status, setStatus] = useState(true);

  localStorage.removeItem("module_id");
  localStorage.removeItem('user_id');


  $(document).ready(function () {
    $("#myTable").DataTable();
  });

  const [modulesData, setModulesData] = useState([]);

  const navigate = useNavigate();


  const HandleEdit = (val) => {
    navigate("/addmodule")
    localStorage.setItem("module_id" ,val);
};

  const HandleStatus = (val1, val2) => {
    let values = {
      module_id: val1,
      status: val2,
    };
    axios
      .patch(urlData + "module/manage", values)
      .then((res) => {
        res.data.statuscode == 1 ? toast.success('Module Activated Successfully...!',{position: toast.POSITION.TOP_CENTER}):  toast.success('Module Deactivated Successfully...!',{position: toast.POSITION.TOP_CENTER})

        console.log(res.data);
        setStatus(!status);
      })
      .catch((err) => {
        console.log(err);
        setStatus(!status);
      });
  };

  const handledel = (user_id) => {
    toast.error('Module Deleted Successfully...!',{position: toast.POSITION.TOP_CENTER})

    axios
      .delete(urlData + `module/delete/${user_id}`)
      .then((res) => {
        console.log(res);
        setStatus(!status);
      })
      .catch((err) => {
        console.log(err);
        setStatus(!status);
      });
  };

  useEffect(() => {
    axios
      .get(urlData + "module/fetchall")
      .then((res) => setModulesData(res.data.moduleDetails));
  }, [status]);

  const HandleAddModule = () => {
    navigate("/addmodule");
  };


  return (
    <div id="mod" className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h1>Modules</h1>
        </div>
        <div className="col-md-6">
          <button onClick={HandleAddModule} className="btn btn-danger pull-right">
            Add Modules
          </button>{" "}
          &nbsp; &nbsp;
        </div>
      </div>

      <div className="row">

      {modulesData.length > 0 &&
                                        
        <table id="myTable" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Module Title</th>
              <th>Course Title</th>
              <th>Details</th>
              <th>No Of Questions</th>
              <th>No. of Chapters </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          {modulesData.map((e) => (
              <tr>
                <td>{e.module_id}</td>
                <td>{e.module_title}</td>
                <td>{e.course_title}</td>
                <td>{e.details}</td>
                <td>{e.number_of_questions}</td>
                <td>{e.number_of_chapters}</td>
                <td>
                  <i 
                    onClick={() => handledel(e.module_id)}
                    className="fa fa-trash"
                    style={{
                      color: "red",
                      fontSize: "25px",
                      marginLeft: "10px",
                    }}
                  />
                  <i
                    onClick={ () => HandleEdit(e.module_id)}
                    className="bi bi-pencil"
                    style={{
                      color: "blue",
                      fontSize: "25px",
                      marginLeft: "10px",
                    }}
                  />
                  {e.status == 0 ? (
                    <i 
                      onClick={()=>HandleStatus(e.module_id, e.status)}
                      className="fa fa-check"
                      style={{
                        color: "green",
                        fontSize: "30px",
                        marginLeft: "10px",
                      }}
                    />
                  ) : (
                    <i
                      onClick={()=>HandleStatus(e.module_id, e.status)}
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
}
      </div>
      <ToastContainer/>
    </div>
  );
};
