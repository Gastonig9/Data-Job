import "./OptionJob.css";
import { contextJob } from "../../services/context/jobContext";
import { useContext } from "react";

export default function OptionJob() {
  const { setSelectedTech, setSelectedSeniority, setSelectedCountry } = useContext(contextJob);


  const handleTechChange = (e) => {
    setSelectedTech(e.target.value)
  }

  const handleSeniorityChange = (e)=> {
    setSelectedSeniority(e.target.value)
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
  }
  return (
    <>
      <div className="row align-items-center column-options-contain">
        <div className="col">
          <select
            className="form-select"
            id="select-tech"
            aria-label="Default select example"
            defaultValue="Tech"
            onChange={handleTechChange}
          >
            <option value="None">None</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="Javascript">Javascript</option>
            <option value="Angular">Angular</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="Database">Database</option>
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            id="select-seniority"
            aria-label="Default select example"
            defaultValue="Seniority"
            onChange={handleSeniorityChange}
          >
            <option value="None">None</option>
            <option value="Trainee">Trainee</option>
            <option value="Junior">Junior</option>
            <option value="Semi Senior">Semi Senior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            id="select-country"
            aria-label="Default select example"
            defaultValue="Country"
            onChange={handleCountryChange}
          >
            <option value="None">None</option>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Mexico">Mexico</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </>
  );
}
