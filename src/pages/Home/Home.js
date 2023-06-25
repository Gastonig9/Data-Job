import CardJob from "../../components/CardJob/CardJob";
import { contextJob } from "../../services/context/jobContext";
import OptionJob from "../../components/OptionJob/OptionJob";
import "./Home.css";

//Firebase
import { getJob } from "../../services/firebase/firestore"
import { useContext, useEffect } from "react";


export default function Home() {
    const { setJobs } = useContext(contextJob)

    useEffect(() => {
      getJob().then(response => {
        setJobs(response)
      })
    }, [setJobs])
    
  return (
    <>
      <div className="description-contain">
        <h1>
          Welcome to <span>DataJob!</span>
        </h1>
        <h4>
          We connect talented professionals from the technology industry with
          the best job opportunities.
        </h4>
      </div>

      <OptionJob />
      <CardJob />
    </>
  );
}
