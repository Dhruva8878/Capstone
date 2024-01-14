import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Material.css";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import { urlData } from "../../urlData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Material = () => {

  $(document).ready(function () {
    $("#myTable").DataTable();
  });

  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  localStorage.removeItem("material_id");
  localStorage.removeItem('user_id');


  const HandleEdit = (val) => {
      navigate("/addMaterial")
      localStorage.setItem("material_id" ,val);
  };



  const handledel = (material_id)  =>{
    toast.error("Material Deleted Successfully...!",{position: toast.POSITION.TOP_CENTER});
    axios.delete(urlData+`material/delete/${material_id}`)
         .then((res) =>{
           console.log(res);
           setStatus(!status);
         })
         .catch((err)=>{
           console.log(err);
           setStatus(!status);
         })
}

  const HandleStatus = (val1, val2) => {
    let values = {
      material_id: val1,
      status: val2,
    };

    axios
      .patch(urlData + "material/manage", values)
      .then((res) => {
        res.data.statuscode == 1 ? toast.success("Material Activated Successfully...!",{position: toast.POSITION.TOP_CENTER}) : toast.success("Material Deactivated Successfully...!",{position: toast.POSITION.TOP_CENTER});
        console.log(res.data);
        setStatus(!status);
      })
      .catch((err) => {
        console.log(err);
        setStatus(!status);
      });
  };

  const [materialData, setMaterialData] = useState([]);
  const handleAddMaterial = () => {
    navigate("/addmaterial");
  };

  useEffect(() => {
    axios
      .get(urlData + "material/fetchall")
      .then((res) => setMaterialData(res.data.moduleDetails));
  }, [status]);


  return (
    <div id="mat" className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h1>Materials</h1>
        </div>
        <div className="col-md-6">
          <button onClick={handleAddMaterial} className="btn btn-danger pull-right">
            Add Material
          </button>
        </div>
      </div>
    
      <div className="row">

      {materialData.length > 0 &&
                                        

        <table
          id="myTable"
          className="display table table-bordered table-hover "
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Module Title</th>
              <th>Material Title</th>
              <th>Material Details</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          {materialData.map((e) => (
              <tr>
                <td>{e.material_id}</td>
                <td>{e.course_title}</td>
                <td>{e.module_title}</td>
                <td>{e.material_title}</td>
                <td>{e.material_details}</td>
                <td>
                  <i 
                    onClick={() => handledel(e.material_id)}
                    className="fa fa-trash"
                    style={{
                      color: "red",
                      fontSize: "25px",
                      marginLeft: "10px",
                    }}
                  />
                  <i
                    onClick={ () => HandleEdit(e.material_id)}
                    className="bi bi-pencil"
                    style={{
                      color: "blue",
                      fontSize: "25px",
                      marginLeft: "10px",
                    }}
                  />
                  {e.status == 0 ? (
                    <i 
                      onClick={()=>HandleStatus(e.material_id, e.status)}
                      className="fa fa-check"
                      style={{
                        color: "green",
                        fontSize: "30px",
                        marginLeft: "10px",
                      }}
                    />
                  ) : (
                    <i
                      onClick={()=>HandleStatus(e.material_id, e.status)}
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
