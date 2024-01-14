import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Auth()
{
    const navigate=useNavigate();
    useEffect(()=>{
        var path=window.location.pathname;
        if(path=='/myprofile' || path=="/courses" ||path=="/material" || path=="/modules" || path=="/material" || path=="/user")
        {
            if(!localStorage.getItem("token") || localStorage.getItem("role")!="admin")
            {
                navigate("/logout");   
            }
        }
        else if(path=='/myprofile' || path=="/courses" ||path=="/material" || path=="/module" )
        {
            if(!localStorage.getItem("token") || localStorage.getItem("role")!="user")
            {
                navigate("/logout");
            }
        }
        else
        {
            if(localStorage.getItem("role")=="user")
            {
                navigate("/myprofile");
            }
            else if(localStorage.getItem("role")=="admin")
            {
                navigate("/myprofile");
            }
            else
            {
                // navigate('/reset')
                navigate("/");
              
            }
        }
    },[])
    return(
        <div></div>
    )
}

export default Auth;
