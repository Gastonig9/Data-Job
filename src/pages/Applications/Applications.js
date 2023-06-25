import "./Applications.css";
import { contextJob } from "../../services/context/jobContext";
import {
  getSavedJobsUser,
  //   useAuthListener,
} from "../../services/firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../../components/Profile/Profile";

export default function Applications() {
  const [savedJobs, setsavedJobs] = useState([]);
  const { user } = useContext(contextJob);
  //   const { user } = useAuthListener() || {};

  useEffect(() => {
    if (user) {
      getSavedJobsUser(user.uid)
        .then((response) => {
          setsavedJobs(response);
        })
        .catch((error) => {
          throw new Error("An error ocurred" + error);
        });
    } else {
      return;
    }
  }, [user]);

  return (
    <>
      <div className="button-list">
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="/">
                <button className="btn btn-light btn-block mt-2">
                  <i className="fa-solid fa-arrow-left"></i> Return to home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {user && <Profile user={user.email} userId={user.uid} />}

      <div className="applications-title mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Saved Jobs:</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="jobs-save-container">
        <div className="container">
          <div className="row">
            <div className="col">
              {savedJobs.map((job) => {
                return (
                  <>
                    <Link style={{textDecoration: "none"}} to={`/viewjob/${job.job.id}`}>
                      <div key={job.id} className="card card-job">
                        <div className="card-body">
                          <h3>{job.job.jobName}</h3>
                          <p>{job.job.company}</p>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
