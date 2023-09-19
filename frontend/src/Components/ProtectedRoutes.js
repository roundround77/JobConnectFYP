import { useNavigate } from "react-router-dom";
import AuthUser from "../Components/AuthUser";
import LoginPage from "../Pages/Login/LoginPage";
import SignIn from "../Pages/SignIn/SignIn";

export default function ProtectedRoutes(props) {
    const navigate = useNavigate();
    const { Component } = props;
    const { getToken } = AuthUser();
    const user = getToken();

    // Check if the user is authenticated (has a token)
    if (user == null) {
        // If not authenticated, render the SignIn component
        return <SignIn />;
    }

    // If authenticated, render the specified Component
    return (
        <div>
            <Component />
        </div>
    );
}
