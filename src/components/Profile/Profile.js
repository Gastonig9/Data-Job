import "./Profile.css";
import { updateProfile, getProfile } from "../../services/firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile(props) {
  const [profile, setProfile] = useState([]);
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [alert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorVerification, setErrorVerification] = useState(false);

  useEffect(() => {
    if (props.userId) {
      getProfile(props.userId)
        .then((response) => {
          setProfile(response);
        })
        .catch((error) => {
          throw new Error("An error occurred: " + error);
        });
    } else {
      throw new Error("User not logged in");
    }
  }, [props.userId]);

  const handleClickAlert = () => {
    setAlert(true);
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleCangeBirthdate = (e) => {
    setBirthdate(e.target.value);
  };

  const handleChangedPosition = (e) => {
    setPosition(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
  };

  const handleSaveProfile = async () => {
    const profileData = {
      newUser: username,
      description: description,
      imageProfile: profile.imageProfile,
      birthdate: birthdate,
      position: position,
    };

    if (!profileData.newUser || !profileData.description || !profileData.birthdate || !profileData.position || !profileImg) {
      setErrorVerification(true);
      return;
    }

    let imageProfile = profileData.imageProfile;

    if (profileImg) {
      const reader = new FileReader();
      reader.readAsDataURL(profileImg);
      reader.onloadend = () => {
        imageProfile = reader.result;
        updateProfile(props.userId, {
          newUser: username,
          description: description,
          imageProfile: imageProfile,
          birthdate: birthdate,
          position: position,
        })
          .then(() => {
            let count = 0;
            setErrorVerification(false);
            let intervalProfile = setInterval(() => {
              count++;
              if (count === 1) {
                setLoader(true);
              }
              if (count === 3) {
                setAlert(false);
              }
              if (count === 4) {
                clearInterval(intervalProfile);
                window.location.reload();
              }
            }, 1000);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      };
    } else {
      await updateProfile(props.userId, profileData)
        .then(() => {
          let count = 0;
          setErrorVerification(false);
          let intervalProfile = setInterval(() => {
            count++;
            if (count === 1) {
              setLoader(true);
            }
            if (count === 3) {
              setAlert(false);
            }
            if (count === 4) {
              clearInterval(intervalProfile);
              window.location.reload();
            }
          }, 1000);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    }
  };

  return (
    <>
      <div className="profile-title mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Profile info:</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-container">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card mb-3 card-contain card-active-hover" style={{ maxWidth: "840px" }}>
                <div className="row g-0">
                  <div className="col-md-4 img-contain">
                    <img
                      src={profile.imageProfile || "https://i.ibb.co/yN0Yw18/user.jpg"}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8 body-contain">
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>User:</b> {profile.newUser || "Not Name"}
                      </h5>
                      <p className="text-light">
                        <small>Position: {profile.position || "Not complete"}</small>
                      </p>

                      <hr className="border border-light border-1 opacity-75"></hr>

                      <h5>
                        <b>Description</b>
                      </h5>
                      <p className="text-light">{profile.description || "Not complete"}</p>

                      <hr className="border border-light border-1 opacity-75"></hr>

                      <h5>
                        <b>Date</b>
                      </h5>
                      <p className="text-light">{profile.birthdate || "XX/XX/XXXX"}</p>
                    </div>
                  </div>
                  <button onClick={handleClickAlert} className="btn btn-primary btn-block">
                    Change profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {alert && (
        <div className="alert alert-secondary alert-profile" role="alert">
          <h1>Add information for your profile</h1>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChangeUsername}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Position
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="For example, Web Developer"
              aria-label="position"
              aria-describedby="basic-addon1"
              onChange={handleChangedPosition}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Birthdate
            </span>
            <input
              type="date"
              className="form-control"
              placeholder="Your birthdate"
              aria-label="birthdate"
              aria-describedby="basic-addon1"
              onChange={handleCangeBirthdate}
              required
            />
          </div>
          <div className="input-group">
            <span className="input-group-text">Add a short description </span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              onChange={handleChangeDescription}
            ></textarea>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Add a profile photo
            </span>
            <input
              type="file"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleFile}
            />
          </div>

          {errorVerification && <h6 className="text-danger">You must fill in all the fields</h6>}

          <div className="buttons-container">
            <button className="btn btn-success btn-block" onClick={handleSaveProfile}>
              {loader ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Save profile"
              )}
            </button>
            <button className="btn btn-danger btn-block" onClick={handleCloseAlert}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}