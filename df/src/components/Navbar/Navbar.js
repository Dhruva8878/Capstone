import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import Auth from "../Auth/Auth";

export const Navbar = () => {
  const [NavContent, setNavContent] = useState();
  const navigate = useNavigate();


  // const funhome = () => {

  //   navigate("/home")
  //   window.location.reload();
  // }
  // const funlog = () => {
  //   navigate("/")
  //   window.location.reload();
  // }

  const handleLogout = () => {
     localStorage.removeItem("role");
     localStorage.removeItem("email");
     localStorage.removeItem('token');
     localStorage.removeItem('user_id')
      navigate("/");
  }

  useEffect(() => {
    setTimeout(()=>{

   
    if (localStorage.getItem("role") == "admin") {
      setNavContent(
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
          <a className="navbar-brand bg-primary d-flex align-items-center px-4 px-lg-5">
              <Link to={"/home"}>
              <h2 className="mb-2 text-white">ℂ𝕒𝕡𝕊𝕥𝕠𝕟𝕖</h2>
              </Link>
          </a>
          <button
            type="button"
            className="navbar-toggler me-4"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              {/* <Link to={""}>
                <a className="nav-item nav-link active">Home</a>
              </Link> */}
              <Link to={"/courses"}>
                <a className="nav-item nav-link">Courses</a>
              </Link>

              <Link to={"/modules"}>
                <a className="nav-item nav-link">Modules</a>
              </Link>

              <Link to={"/material"}>
                <a className="nav-item nav-link">Material</a>
              </Link>


              <Link to={"/myprofile"}>
                <a className="nav-item nav-link">Myprofile</a>
              </Link>

              <Link to={"/user"}>
                <a className="nav-item nav-link">User</a>
              </Link>

              <Link to={"/"}>
                <a onClick={handleLogout} className="nav-item nav-link">Logout</a>
              </Link>
            </div>
          </div>
        </nav>
      );
    } else if (localStorage.getItem("role") == "user") {
      setNavContent(
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
          <a className="navbar-brand bg-primary d-flex align-items-center px-4 px-lg-5">
            <h2 className="mb-2 text-white">CapStone</h2>
          </a>
          <button
            type="button"
            className="navbar-toggler me-4"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              {/* <Link to={""}>
                <a className="nav-item nav-link active">Home</a>
              </Link> */}

              <Link to={"/courses"}>
                <a className="nav-item nav-link">Courses</a>
              </Link>

              <Link to={"/modules"}>
                <a className="nav-item nav-link">Modules</a>
              </Link>

              <Link to={"/material"}>
                <a className="nav-item nav-link">Material</a>
              </Link>

              <Link to={"/myprofile"}>
                <a className="nav-item nav-link">Myprofile</a>
              </Link>

              <Link to={"/"}>
                <a onClick={handleLogout} className="nav-item nav-link">Logout</a>
              </Link>
            </div>
          </div>
        </nav>
      );
    } else {
      setNavContent(
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
  <a className="navbar-brand bg-primary d-flex align-items-center px-4 px-lg-5">
    <h2 className="mb-2 text-white">ℂ𝕒𝕡𝕊𝕥𝕠𝕟𝕖 </h2>
  </a>
  <button
    type="button"
    className="navbar-toggler me-4"
    data-bs-toggle="collapse"
    data-bs-target="#navbarCollapse"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarCollapse">
    <div className="navbar-nav ms-auto p-4 p-lg-0">
      <Link to={"/home"}>
        <a  className="nav-item nav-link active">Home</a>
      </Link>

      <Link to={"/"}>
        <a  className="nav-item nav-link">Login</a>
      </Link>
    </div>
  </div>
  <Auth/>
</nav>
      );
    }
  },10)
  });

  return <> {NavContent}</>;
};
