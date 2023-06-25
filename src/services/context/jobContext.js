import React, { createContext, useState } from "react";

const contextJob = createContext({ default: "default" });
const Provider = contextJob.Provider;

function JobProvider(props) {
    const [jobs, setJobs] = useState([])
    const [selectedTech, setSelectedTech] = useState("");
    const [selectedSeniority, setSelectedSeniority] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isAuth, setisAuth] = useState(false);
    const [isSaved, setisSaved] = useState(false)
    const [user, setuser] = useState(null);
    const [register, setregister] = useState(false)

  return(
    <Provider value={{
      jobs, 
      setJobs, 
      selectedTech, 
      setSelectedTech, 
      selectedSeniority, 
      setSelectedSeniority, 
      selectedCountry, 
      setSelectedCountry,
      isAuth, 
      setisAuth,
      user,
      setuser,
      register,
      setregister,
      isSaved,
      setisSaved}}>

      {props.children}
    </Provider>
  ) 
}


export { contextJob, JobProvider }