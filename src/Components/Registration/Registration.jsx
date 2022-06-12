import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, Firebasedb } from "../../Store/FirebaseContext";
import { Registrations } from "../../Store/RegContexts";
import ProgressModal from "./subComponents/ProgressModal";

function Registration({ admin, add }) {
  const picUpload = useRef(null);
  const openRef = useRef(null);
  const closeRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const { Storage, db } = useContext(Firebasedb);
  const { user } = useContext(AuthContext);
  const { details } = useContext(Registrations);
  const history = useNavigate();
  useEffect(() => {
    if (!user) {
      history(`${admin ? "/admin" : "/"}`);
    }
    if (admin) fetchDetails();
  }, []);
  const fetchDetails = () => {
    setFormData(details);
  };
  const handlePicChange = (e) => {
    const [img] = e.target.files;
    setProfilePic(img);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (admin) updateData();
    else uploadData();
  };
  const updateData = () => {
    if (profilePic) uploadImage();
    else updateDocument({ ...formData, status: "Completed" });
  };
  const updateDocument = (data) => {
    const upRef = doc(db, "registrations", details.docid);
    updateDoc(upRef, data)
      .then(() => {
        closeRef.current.click();
        history("/admin");
      })
      .catch((err) => console.error(err.message));
  };
  const uploadImage = () => {
    openRef.current.click();
    const storageRef = ref(Storage, `user-imgs/${profilePic.name}`);
    const task = uploadBytesResumable(storageRef, profilePic);
    task.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        getDownloadURL(storageRef)
          .then((url) => {
            if (admin) {
              updateDocument({
                ...formData,
                status: "Completed",
                profilePic: url,
              });
            } else {
              uploadToFireStore({
                ...formData,
                profilePic: url,
                uid: user.uid,
                status: add ? "Completed" : "Pending",
              });
            }
          })
          .catch((err) => console.error(err.message));
      }
    );
  };
  const uploadData = () => {
    uploadImage();
  };
  const uploadToFireStore = (data) => {
    addDoc(collection(db, "registrations"), data)
      .then(() => {
        closeRef.current.click();
        history(add ? "/admin" : "/");
      })
      .catch((err) => console.error(err.message));
  };
  return (
    <>
      <Link
        to={admin || add ? "/admin" : "/"}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="position-fixed m-3 fa-solid fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title={admin ? "Admin " : "Go home"}
      ></Link>
      <ProgressModal closeRef={closeRef} progress={progress} />
      <button
        data-bs-toggle="modal"
        data-bs-target="#progress-modal"
        hidden
        ref={openRef}
      ></button>
      <div className="container">
        <br />
        <h3 className="text-center fw-bold my-3">Member Registration</h3>
        <br />
        <div className="row w-100">
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Applicant Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.applicantName}
              name="applicantName"
              className="form-control"
              onChange={handleChange}
            />
            <div className="col-md-12 my-3 mt-4">
              <label className="form-label">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                name="phoneNumber"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 my-3 mt-4 d-flex gap-3 align-items-center">
            <div className="img-box d-flex  justify-content-center align-items-center">
              {profilePic || (admin && details.profilePic) ? (
                <img
                  style={{ objectFit: "contain" }}
                  width="120"
                  height="120"
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : admin && details.profilePic
                  }
                  alt=""
                />
              ) : (
                <div className="fas fa-user fs-1"></div>
              )}
            </div>
            <div
              style={{ width: "40%", height: "50px" }}
              className="btn btn-login d-flex justify-content-center align-items-center fw-bold"
              onClick={() => picUpload.current.click()}
            >
              Upload Image
            </div>

            <input
              onChange={handlePicChange}
              type="file"
              name="photo"
              hidden
              ref={picUpload}
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Address of the Applicant <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.applicantAddress}
              name="applicantAddress"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Nominee / Relationship with the Applicant
              <span className="text-danger"> *</span>
            </label>
            <div className="nominee-box">
              <input
                type="text"
                value={formData.nominee}
                name="nominee"
                className="form-control"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formData.relationNominee}
                name="relationNominee"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Nature of Job <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.jobNature}
              name="jobNature"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Blood Group <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.bloodGroup}
              name="bloodGroup"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              value={formData.dob}
              name="dob"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6  mt-4">
            <label className="form-label">Aadhar card number</label>
            <input
              type="tel"
              value={formData.aadharNo}
              name="aadharNo"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 my-3 mt-4">
            <label className="form-label">
              Name of the institution (if any)
            </label>
            <input
              type="text"
              value={formData.institutionName}
              name="institutionName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          {(admin || add) && (
            <>
              <p className="text-center h5 mt-3">To be filled by the admins</p>
              <div className="col-md-6 my-3 mt-4">
                <label className="form-label">
                  Attesting committee member / Admin{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={formData.attestingMember}
                  name="attestingMember"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 my-3 mt-4">
                <label className="form-label">
                  AKWA ID Card Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={formData.idCardNo}
                  name="idCardNo"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 my-3 mt-4">
                <label className="form-label">
                  Date of Issue of Id Card{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateofIdIssue}
                  name="dateofIdIssue"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 my-3 mt-4">
                <label className="form-label">
                  Date of Expiry of Id Card{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateofIdExp}
                  name="dateofIdExp"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="col-md-12 my-3 mt-4 d-flex justify-content-center w-100">
            <button
              style={{ width: "40%" }}
              className="btn btn-login fw-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
