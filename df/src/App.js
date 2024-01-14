import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import { Courses } from "./components/Courses/Courses";
import { Modules } from "./components/Modules/Modules";
import { Login } from "./components/login/Login";
import { Material } from "./components/Material/Material";
import { AddModule } from "./components/AddModule/AddModule";
import { AddCourse } from "./components/AddCourse/AddCourse";
import { AddMaterial } from "./components/AddMaterial/AddMaterial";
import { User } from "./components/User/User";
import { ForgetPassword } from "./components/ForgetPass/ForgotPassword";
import { MyProfile } from "./components/MyProfile/MyProfile";

function App() {
  return (
    <div className="App">

      <Navbar/>

      <Routes>
        <Route path="" element={<Login/>}></Route>
        <Route path="/material" element={<Material/>}></Route>
        <Route path="/courses" element={<Courses/>}></Route>
        <Route path="/modules" element={<Modules/>}></Route>
        <Route path="/myprofile" element={<MyProfile/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/addmodule" element={<AddModule/>}></Route>
        <Route path="/addcourse" element={<AddCourse/>}></Route>
        <Route path="/addmaterial" element={<AddMaterial/>}></Route>
        <Route path="/user" element={<User/>}></Route>
        <Route path="/reset" element={<ForgetPassword/>}></Route>
      </Routes>


      <Footer/>
      
    
    </div>
  );
}

export default App;
