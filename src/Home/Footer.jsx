import React from "react";
import "./styles.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row flex">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;