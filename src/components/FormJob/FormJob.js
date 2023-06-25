import React, { useState } from "react";
import { exportJobs } from "../../services/firebase/firestore";
import "./FormJob.css";
import { useNavigate } from "react-router-dom";

export default function FormJob() {
  const [formData, setFormData] = useState({
    availability: "", //x
    city: "", //x
    company: "", //x
    country: "", //x
    description: "", //x
    jobName: "", //x
    remote: "",
    salary: "", //x
    seniority: "",
    tech: "", //x
    uploadDate: "",
    mail: "", //x
    urlLinkedin: "", //x
  });
  const [validation, setValidation] = useState(false);
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.availability);
  };

  const handleSubmit = () => {
    let count = 0;
    if (
      !formData.availability ||
      !formData.country ||
      !formData.description ||
      !formData.jobName ||
      !formData.remote ||
      !formData.seniority ||
      !formData.tech ||
      !formData.mail ||
      !formData.urlLinkedin
    ) {
      let intervalValidation = setInterval(() => {
        count++;
        if (count === 1) {
          setValidation(true);
        }
        if (count === 4) {
          setValidation(false);
          clearInterval(intervalValidation);
        }
      }, 1000);
    } else {
      exportJobs(
        formData.availability,
        formData.city,
        formData.company,
        formData.country,
        formData.description,
        formData.jobName,
        true,
        formData.salary,
        formData.seniority,
        formData.tech,
        formData.mail,
        formData.urlLinkedin
      );
      setFormData({
        availability: "", //x
        city: "", //x
        company: "", //x
        country: "", //x
        description: "", //x
        jobName: "", //x
        remote: "",
        salary: "", //x
        seniority: "",
        tech: "", //x
        uploadDate: "",
        mail: "", //x
        urlLinkedin: "", //x
      });
      navigate("/")
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Job form</h2>
        <hr className="border border-light border-3 opacity-75" />
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="jobName">Job name</label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              value={formData.jobName}
              placeholder="Javascript developer..."
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-col">
            <label htmlFor="description">Job description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description for the job"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-col">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country job"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-col">
            <label htmlFor="city">
              City <small style={{ color: "black" }}>optional</small>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City job"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-col">
            <label htmlFor="company">
              Company <small style={{ color: "black" }}>optional</small>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company name"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-col">
            <label htmlFor="salary">
              Salary <small style={{ color: "black" }}>optional</small>
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder="An approximate salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div className="form-col">
            <label htmlFor="tech">Tech</label>
            <input
              type="text"
              id="tech"
              name="tech"
              placeholder="Java, C#, Javascript, React"
              value={formData.tech}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-col">
            <label htmlFor="mail">Mail contact</label>
            <input
              type="email"
              id="mail"
              name="mail"
              placeholder="Contact email for job"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-col">
            <label htmlFor="urlLinkedin">
              URL Linkedin or another platform
            </label>
            <input
              type="text"
              id="urlLinkedin"
              name="urlLinkedin"
              placeholder="Url to the offer on linkedin"
              value={formData.urlLinkedin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-col">
            <label htmlFor="urlLinkedin">
              Seniority
            </label>
            <input
              type="text"
              id="seniority"
              name="seniority"
              placeholder="Trainee, Junior, Ssr, Senior"
              value={formData.seniority}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-col">
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="">Select availability</option>
              <option value="Full time">Part time</option>
              <option value="Part time">Full time</option>
            </select>
          </div>

          <div className="form-col d-flex mr-5">
            <label>Remote</label>
            <div>
              <input
                type="radio"
                id="remote-remote"
                name="remote"
                value="Remote"
                checked={formData.remote === "Remote"}
                onChange={handleChange}
              />
              <label htmlFor="remote-remote">Face to face</label>
            </div>
            <div>
              <input
                type="radio"
                id="remote-face-to-face"
                name="remote"
                value="Face to face"
                checked={formData.remote === "Face to face"}
                onChange={handleChange}
              />
              <label htmlFor="remote-face-to-face">Remote</label>
            </div>
          </div>
        </div>

        <div className="button-form">
          <button onClick={handleSubmit} className="btn btn-dark btn-block">
            Send job
          </button>
        </div>

        {validation && (
          <div className="error-field">
            <h6>
              Please complete all the required fields and remember to enter a
              valid email
            </h6>
          </div>
        )}
        <hr className="border border-light border-3 opacity-75" />
      </div>
    </>
  );
}
