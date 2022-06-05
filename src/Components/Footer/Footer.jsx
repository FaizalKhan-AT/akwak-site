import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="d-flex flex-column">
        <div>
          <Link
            to="https://www.facebook.com/groups/2793711450840872/?ref=share"
            target="_blank"
            className="fab fa-facebook"
          ></Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
