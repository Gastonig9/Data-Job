import { Link } from "react-router-dom";
import { contextJob } from "../../services/context/jobContext";
import { useContext, useState, useEffect } from "react";
import "./CardJob.css";

export default function CardJob() {
  const { jobs, selectedTech, selectedSeniority, selectedCountry } = useContext(contextJob);
  const [filter, setFilter] = useState(false);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    const filterJobs = jobs.filter(job => {
      if (
        (selectedTech === "None" || selectedSeniority === "None" || selectedCountry === "None") ||
        (!selectedTech && !selectedSeniority && !selectedCountry)
      ) {
        return true; // Mostrar todos los trabajos si alguna opción es "None" o no se selecciona ninguna opción
      }
      // Filtrar por las opciones seleccionadas
      return (
        (!selectedTech || job.tech === selectedTech) &&
        (!selectedSeniority || job.seniority === selectedSeniority) &&
        (!selectedCountry || job.country === selectedCountry)
      );
    });
  
    if (filterJobs.length > 0) {
      setFilter(true);
      setVisibleData(filterJobs.slice(0, 3));
    }
  }, [jobs, selectedTech, selectedSeniority, selectedCountry]);
  
  const handleClick = () => {
    const length = visibleData.length;
    const endIndex = length + 3;
  
    if (endIndex <= jobs.length) {
      const newVisibleData = !filter
        ? jobs.slice(0, endIndex)
        : jobs.filter(job => {
            if (
              (selectedTech === "None" || selectedSeniority === "None" || selectedCountry === "None") ||
              (!selectedTech && !selectedSeniority && !selectedCountry)
            ) {
              return true; // Mostrar todos los trabajos si alguna opción es "None" o no se selecciona ninguna opción
            }
            // Filtrar por las opciones seleccionadas
            return (
              (!selectedTech || job.tech === selectedTech) &&
              (!selectedSeniority || job.seniority === selectedSeniority) &&
              (!selectedCountry || job.country === selectedCountry)
            );
          }).slice(0, endIndex);
  
      setVisibleData(newVisibleData);
    }
  };
  
  

  const getTimeElapsed = (job) => {
    const today = Math.floor(Date.now() / 1000);
    const secondsElapsed = job.uploadDate.seconds;
    const timeElapsed = secondsElapsed - today;
    const daysElapsed = Math.floor(Math.abs(timeElapsed / 86400));

    if (daysElapsed === 0) {
      return "today";
    } else {
      return `${daysElapsed}d`;
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="loader-contain">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      {visibleData.map((job, index) => {
        return (
          <div key={index} className="card card-contain">
            <div className="card-body">
              <h5 className="card-title">{job.jobName}</h5>

              <div className="container text-center column-contain">
                <div className="row">
                  <div className="col order-last column-left">
                    <i className="fa-solid fa-microchip"></i> {job.tech}
                  </div>

                  <div className="col order-last column-left">
                    <i className="fa-solid fa-calendar-days"></i> {getTimeElapsed(job)}
                  </div>

                  <div className="col column-center">
                    {job.company || "Not specified"}
                  </div>

                  <div className="col column-center">
                    <i className="fa-solid fa-house-laptop"></i> {job.remote ? "Remote" : "Face-to-face"}
                  </div>

                  <div className="col order-first column-rigth">
                    <i className="fa-solid fa-earth-americas"></i> {job.country}
                  </div>
                </div>
              </div>

              <div className="button-link">
                <Link className="link-job" to={`/viewjob/${job.id}`}>
                  <h6>View job</h6>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <div className="button-see-more">
        <button onClick={handleClick}>See more</button>
      </div>
    </>
  );
}
