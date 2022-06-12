import React from "react";

function Footer() {
  return (
    <div className="footer pt-3">
      <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
        <div className="d-flex align-items-center gap-3">
          <a
            href="https://www.facebook.com/groups/2793711450840872/?ref=share"
            target="_blank"
            title="Official facebook group"
            rel="noreferrer"
            className="fab fa-facebook fs-3 text-decoration-none text-light"
          ></a>
          <a
            href="http://akwakerala.in/"
            target="_blank"
            title="Official website"
            rel="noreferrer"
            className="fa-solid fa-earth-africa fs-3 text-decoration-none text-light"
          ></a>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="fs-6">&copy; 2022 AKWA</p>
          <p className="fs-6 mt-0">
            Site developed by{" "}
            <a
              href="https://faizalkhan-at.github.io/animated-porfolio-angular/"
              target="_blank"
              title="Official website of developer"
              className=" text-light"
              rel="noreferrer"
            >
              Faizal Khan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
