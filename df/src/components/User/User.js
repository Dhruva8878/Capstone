import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { urlData } from "../../urlData";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const User = () => {
  localStorage.removeItem("user_id");
  
  const [status, setStatus] = useState(true);

  
  $(document).ready(function () {
    $("#myTable").DataTable();
  });

  const HandleStatus = (val1, val2) => {

    let values = {
      user_id: val1,
      status: val2,
    };
    axios
      .patch(urlData + "user/manage", values)
      .then((res) => {
        res.data.statuscode == 1 ? toast.success('User Activated Successfully...!',{position: toast.POSITION.TOP_CENTER}) : toast.success('User Deactivated Successfully...!',{position: toast.POSITION.TOP_CENTER});
        console.log(res.data);
        setStatus(!status);
      })
      .catch((err) => {
        console.log(err);
        setStatus(!status);
      });
  };

  const HandleEdit = (val) => {
    localStorage.setItem("user_id", val);
    navigate("/myprofile");
  };

  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  

  const handledel = (user_id) => {
    toast.error('User Deleted Successfully...!',{position: toast.POSITION.TOP_CENTER})
    axios
      .delete(urlData + `user/deluser/${user_id}`)
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
      .get(urlData + "user/fetchall")
      .then((res) => setUserData(res.data.userDetails));
  }, [status]);


  return (
    <div id="mat" className="container-fluid">
      <h1>User</h1>

      <div className="row">
      {userData.length > 0 &&
                                        
        <table
          id="myTable"
          className="display table table-bordered table-hover "
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {userData.map((e) => (
              <tr>
                <td>{e.user_id}</td>
                <td>{e.role}</td>
                <td>{e.first_name + " " + e.last_name}</td>
                <td>{e.email}</td>
                <td>{e.mobile}</td>
                <td>{e.address1}</td>
                <td>
                  <i 
                    onClick={() => handledel(e.user_id)}
                    className="fa fa-trash"
                    style={{
                      color: "red",
                      fontSize: "25px",
                      marginLeft: "10px",
                    }}
                  />
                  <i
                    onClick={ () => HandleEdit(e.user_id)}
                    className="bi bi-pencil"
                    style={{
                      color: "blue",
                      fontSize: "25px",
                      marginLeft: "25px",
                    }}
                  />
                  {e.status == 0 ? (
                    <i 
                      onClick={()=>HandleStatus(e.user_id, e.status)}
                      className="fa fa-check"
                      style={{
                        color: "green",
                        fontSize: "30px",
                        marginLeft: "25px",
                      }}
                    />
                  ) : (
                    <i
                      onClick={()=>HandleStatus(e.user_id, e.status)}
                      className="fa fa-remove"
                      style={{
                        color: "red",
                        fontSize: "30px",
                        marginLeft: "25px",
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
