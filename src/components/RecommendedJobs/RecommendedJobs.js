import "./RecommendedJobs.css";
import { contextJob } from "../../services/context/jobContext";
import { useContext, useState, useEffect } from "react";
import { getJob } from "../../services/firebase/firestore";
import { Link } from "react-router-dom";

export default function RecommendedJobs() {
  const { jobs, setJobs } = useContext(contextJob);
  const [randomJobs, setRandomJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJob();
        setJobs(response);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, [setJobs]);

  useEffect(() => {
    const getRandomJobs = () => {
      let arrayJob = jobs;
      let randomArrayJobs = [];

      while (randomArrayJobs.length < 3) {
        let randomIndex = Math.floor(Math.random() * arrayJob.length);
        if (!randomArrayJobs.includes(randomIndex)) {
          randomArrayJobs.push(randomIndex);
        }
      }

      let randomJobs = randomArrayJobs.map((indexJob) => arrayJob[indexJob]);
      setRandomJobs(randomJobs);
    };

    if (jobs.length > 0) {
      getRandomJobs();
    }
  }, [jobs]);

  const handleNewJobs = () => {
    const getRandomJobs = () => {
      let arrayJob = jobs;
      let randomArrayJobs = [];

      while (randomArrayJobs.length < 3) {
        let randomIndex = Math.floor(Math.random() * arrayJob.length);
        if (!randomArrayJobs.includes(randomIndex)) {
          randomArrayJobs.push(randomIndex);
        }
      }

      let randomJobs = randomArrayJobs.map((indexJob) => arrayJob[indexJob]);
      setRandomJobs(randomJobs);
    };

    getRandomJobs()
  }


  return (
    <>
      <div className="title-item">
        <h2>More jobs</h2>
      </div>

      <div className="jobs-recommended-contain container">
        {randomJobs.length > 0 ? (
          randomJobs.map((job) => (
            <>
              <Link className="link-card" to={`/viewjob/${job.id}`}  onClick={handleNewJobs}>
                <div className="card card-item" key={job.id}>
                  <div className="card-header">{job.jobName}</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <i className="fa-solid fa-earth-americas"></i>{" "}
                      {job.country}
                    </li>
                    <li className="list-group-item">
                      <i className="fa-solid fa-building"></i>{" "}
                      {job.company || "Not specified"}
                    </li>
                  </ul>
                </div>
              </Link>
            </>
          ))
        ) : (
          <div className="text-light">Loading...</div>
        )}
      </div>
    </>
  );
}
