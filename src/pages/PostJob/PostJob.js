import { Link } from "react-router-dom";
import FormJob from "../../components/FormJob/FormJob";
// import { FormJob } from "../../components/FormJob/FormJob";

export default function PostJob() {
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

      <FormJob/>
    </>
  );
}
