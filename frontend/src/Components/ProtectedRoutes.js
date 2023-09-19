import { useNavigate } from "react-router-dom";
import AuthUser from "../Components/AuthUser";
import LoginPage from "../Pages/Login/LoginPage";
import SignIn from "../Pages/SignIn/SignIn";

export default function ProtectedRoutes(props) {

    const navigate=useNavigate()
    const { Component } = props;
    const { getToken } = AuthUser()
    const user = getToken()
    if (user==null) {
    
       return <SignIn/>
    }
  return (
    <div>
      <Component />
    </div>
  );
}
