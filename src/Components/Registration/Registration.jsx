import { signOut } from "firebase/auth";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, Firebasedb } from "../../Store/FirebaseContext";
import { Registrations } from "../../Store/RegContexts";
import Toast from "../Toast/Toast";
import {
  validateAadhar,
  validateBloodGroup,
  validatePhone,
} from "../Validation";
import ProgressModal from "./subComponents/ProgressModal";

function Registration({ admin, add }) {
  const picUpload = useRef(null);
  const openRef = useRef(null);
  const closeRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const { Storage, db, Auth } = useContext(Firebasedb);
  const { user, setUser } = useContext(AuthContext);
  const { details } = useContext(Registrations);
  const history = useNavigate();
  useEffect(() => {
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
    const val = validateForm();
    if (val) {
      if (admin) updateData();
      else uploadData();
    }
  };
  const validateForm = () => {
    const {
      applicantName,
      applicantAddress,
      dob,
      phoneNumber,
      nominee,
      relationNominee,
      jobNature,
      bloodGroup,
      aadharNo,
      institutionName,
      attestingMember,
      idCardNo,
      dateofIdExp,
      dateofIdIssue,
    } = formData;
    if (
      !applicantName &&
      !applicantAddress &&
      !phoneNumber &&
      !nominee &&
      !relationNominee &&
      !jobNature &&
      !bloodGroup
    ) {
      setError("Fill all the required fields marked as (*)");
      return;
    }
    if (admin || add) {
      if (!attestingMember && !idCardNo) {
        setError("Fill all the required fields marked as (*)");
        return;
      }
      if (!dateofIdIssue) {
        setError("Enter Id Issue Date");
        return;
      }
      if (!dateofIdExp) {
        setError("Enter Id Expiry Date");
        return;
      }
    }
    if (applicantName.length < 4) {
      setError("Applicant Name Must be more than 3 characters");
      return;
    }
    if (!validatePhone(phoneNumber)) {
      setError("Enter 10 digit phone number");
      return;
    }
    if (applicantAddress.length < 4) {
      setError("Applicant Address Must be more than 3 characters");
      return;
    }
    if (nominee.length < 4) {
      setError("Nominee name must be more than 3 characters");
      return;
    }
    if (relationNominee.length < 4) {
      setError("Relationship with nominee must be more than 3 characters");
      return;
    }
    if (jobNature.length < 4) {
      setError("Nature of job must be more than 3 characters");
      return;
    }
    if (!validateBloodGroup(bloodGroup)) {
      setError("Not a Blood group or field is empty");
      return;
    }
    if (!dob) {
      setError("Date of birth must be specified");
      return;
    }
    if (!admin) {
      if (!profilePic) {
        setError("Please upload a profile picture");
        return;
      }
    }
    if (aadharNo && aadharNo.length > 0) {
      if (!validateAadhar(aadharNo)) {
        setError("Aadhar no must be 12 digits");
        return;
      }
    }
    if (institutionName && institutionName.length < 3) {
      setError("Institution name must be more than 3 characters");
      return;
    }

    setError("");
    return true;
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
      .catch((err) => setError(err.message));
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
        setError(err.message);
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
          .catch((err) => setError(err.message));
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
        if (!add) {
          signOut(Auth)
            .then(() => setUser(null))
            .catch((err) => setError(err.message));
        }
        history(add ? "/admin" : "/");
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      <Link
        to={admin || add ? "/admin" : "/"}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="position-fixed m-3 fa-solid back fa-angles-left fs-4 d-flex justify-content-center align-items-center btn btn-login"
        title={admin ? "Admin " : "Go home"}
      ></Link>
      <ProgressModal closeRef={closeRef} progress={progress} />
      {error && <Toast msg={error} setMsg={setError} />}
      <button
        data-bs-toggle="modal"
        data-bs-target="#progress-modal"
        hidden
        ref={openRef}
      ></button>
      <div className="container">
        <br />
        <h3 className="text-center fw-bold my-3">Member Registration </h3>
        <br />
        <div className="reg row w-100">
          <div className="col-lg-6  my-3 mt-4">
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
            <div className="col-lg-12  my-3 mt-4">
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
          <div className="col-lg-6 reg-profile my-3 mt-4 d-flex gap-3 align-items-center">
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
              className="btn reg btn-login d-flex justify-content-center align-items-center fw-bold"
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
          <div className="col-lg-6 my-3 mt-4">
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
          <div className="col-lg-6 my-3 mt-4">
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
          <div className="col-lg-6 my-3 mt-4">
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
          <div className="col-lg-6 my-3 mt-4">
            <label className="form-label">
              Blood Group <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.bloodGroup}
              name="bloodGroup"
              className="form-control text-uppercase"
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 my-3 mt-4">
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
          <div className="col-lg-6  mt-4">
            <label className="form-label">Aadhar card number</label>
            <input
              type="tel"
              value={formData.aadharNo}
              name="aadharNo"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 my-3 mt-4">
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
              <div className="col-lg-6 my-3 mt-4">
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
              <div className="col-lg-6 my-3 mt-4">
                <label className="form-label">
                  AKWA ID Card Number <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  value={formData.idCardNo}
                  name="idCardNo"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 my-3 mt-4">
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
              <div className="col-lg-6 my-3 mt-4">
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
          <div className="col-lg-12 my-3 mt-4 d-flex justify-content-center w-100">
            <button
              style={{ width: "40%" }}
              className="btn reg btn-login fw-bold"
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
