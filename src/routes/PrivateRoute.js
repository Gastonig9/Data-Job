import { Navigate, Outlet } from "react-router-dom";
import { contextJob } from "../services/context/jobContext";
import { useContext } from "react";

export default function PrivateRoute({ redirectPath }) {
    const { isAuth } = useContext(contextJob);
    if(!isAuth) {
        console.error("No permissions")
        return <Navigate to={redirectPath}/>
    }

    return <Outlet />
}