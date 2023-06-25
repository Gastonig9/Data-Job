import { Link, useParams } from "react-router-dom";
import { contextJob } from "../../services/context/jobContext";
import "./ViewJob.css";

//Firebase
import { getJobIndividual, saveJob } from "../../services/firebase/firestore";
import { useContext, useEffect, useState } from "react";
import RecommendedJobs from "../../components/RecommendedJobs/RecommendedJobs";

export default function ViewJob() {
  const { isAuth } = useContext(contextJob);
  const [jobIndividual, setJobIndividual] = useState([]);
  const [alert, setalert] = useState(false);
  const [loading, setloading] = useState("Save this job");
  const [buttonDisabled, setbuttonDisabled] = useState(false)

  const { idjob } = useParams();

  useEffect(() => {
    getJobIndividual(idjob).then((response) => {
      setJobIndividual(response);
    });
  }, [idjob]);

  const handleEmail = () => {
    const mail = jobIndividual.mail;
    const subject = jobIndividual.jobName;
    const body = "";

    const mailUrl = `mailto:${mail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailUrl);
  };

  const handleSaveJob = () => {
    if (!isAuth) {
      setalert(true);
    } else {
      let count = 0;
      const loaderInterval = setInterval(() => {
        count++;
        if (count === 1) {
          setloading("Saving..");
          saveJob(jobIndividual)
            .then((response) => {
              console.log("trabajo enviado");
            })
            .catch((error) => {
              console.log("Ocurrio un error" + error);
            });
        }
        if (count === 3) {
          setloading("Job saved");
          setbuttonDisabled(true)
          clearInterval(loaderInterval);
        }
      }, 1000);
    }
  };

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

      <section>
        <div className="container">
          <div className="row">
            <div key={jobIndividual.id} className="col-9 column-title-fx">
              <h1>{jobIndividual.jobName}</h1>
              <hr />
              <h6>
                <i
                  style={{ color: "#EAF27C" }}
                  className="fa-solid fa-building"
                ></i>{" "}
                {jobIndividual.company || "Not specified"}
              </h6>
              <h6>
                <i
                  style={{ color: "#EAF27C" }}
                  className="fa-solid fa-earth-americas"
                ></i>{" "}
                {jobIndividual.city || "Not specified"}
              </h6>
              <h6>
                <i
                  style={{ color: "#EAF27C" }}
                  className="fa-solid fa-house-laptop"
                ></i>{" "}
                {jobIndividual.remote ? "Remote" : "Face-to-face"}
              </h6>
            </div>

            <div className="col-4 column-description">
              <h3>Offer description</h3>
              <hr />
              <p>{jobIndividual.description}</p>
              <hr />
              {jobIndividual.urlLinkedin &&
                jobIndividual.urlLinkedin !== "" && (
                  <button className="btn btn-primary btn-block btn-linkedin">
                    <a
                      href={jobIndividual.urlLinkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-linkedin"></i> Apply in
                      Linkedin
                    </a>
                  </button>
                )}

              <button
                onClick={handleEmail}
                className="btn btn-danger btn-block"
              >
                <i className="fa-solid fa-envelope"></i> Apply with e-mail
              </button>
            </div>

            <div className="col-6 column-information">
              <h3>Additional Information</h3>
              <hr />
              <div className="information-container">
                <p>
                  <i
                    style={{ color: "blue" }}
                    className="fa-solid fa-briefcase"
                  ></i>{" "}
                  Seniority: {jobIndividual.seniority}
                </p>
                <p>
                  <i
                    style={{ color: "green" }}
                    className="fa-solid fa-dollar-sign"
                  ></i>{" "}
                  Salary: {jobIndividual.salary || "Not specified"}
                </p>
                <p>
                  <i
                    style={{ color: "#CE8964" }}
                    className="fa-solid fa-clock"
                  ></i>{" "}
                  Work availability:{" "}
                  {jobIndividual.availability ? "Full time" : "Part time"}
                </p>
                <p>
                  <i className="fa-solid fa-microchip"></i> Techs:{" "}
                  {jobIndividual.tech}
                </p>
              </div>
              <hr />
              <div className={loading === "Job saved" ? "button-save-active" : "button-save"}>
                <button onClick={handleSaveJob} disabled={buttonDisabled}>{loading}</button>
              </div>
              {alert && (
                <div
                  class="alert alert-danger alert-dismissible mt-2 fade show"
                  role="alert"
                >
                  <strong>Sign in to save a job</strong>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <RecommendedJobs />
    </>
  );
}
