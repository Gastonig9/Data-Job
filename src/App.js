import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Pages
import Home from "./pages/Home/Home";
import PostJob from "./pages/PostJob/PostJob";
import ViewJob from "./pages/ViewJob/ViewJob";
import NotFound from "./pages/NotFound/NotFound";
//Components
import Navbar from "./components/Navbar/Navbar";
import { JobProvider } from "./services/context/jobContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Applications from "./pages/Applications/Applications";
// import { exportData } from "./services/firebase/firestore";

function App() {
  return (
    <div className="App">
      {/* <button onClick={exportData}>export</button> */}
      <JobProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route element={<PrivateRoute redirectPath={"/"} />}>
              <Route path="/postjob" element={<PostJob />}></Route>
            </Route>
            {/* <Route element={<PrivateRoute redirectPath={"/"} />}> */}
              <Route path="/applications" element={<Applications/>}></Route>
            {/* </Route> */}
            <Route path="/applications" element={<Applications />}></Route>
            <Route path="/viewjob/:idjob" element={<ViewJob />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </JobProvider>
    </div>
  );
}

export default App;
