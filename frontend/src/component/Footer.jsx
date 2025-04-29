import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="om "style = {{paddingTop:"120px"}}>
    <footer className="py-5 footer-bg p-3" style={{ fontFamily: "'Harmattan', sans-serif", fontSize: "20px", width: "100%", margin: "0px" }}>
      <div className="row">
        <div className="col-6 col-md-2 mb-3">
          <h5 className="text-white" style={{ fontFamily: "'Harmattan', sans-serif", fontSize: "30px" }}><b>Our Restaurant</b></h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-white">Features</Link></li>
            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-white">About</Link></li>
          </ul>
        </div>

        <div className="col-6 col-md-2 mb-3">
          <h5 className="text-white" style={{ fontFamily: "'Harmattan', sans-serif", fontSize: "30px" }}><b>Contact us</b></h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2 text-white">
              <p>9802110937</p>
              <p>9869373674</p>
              <p>Bajrapalaasupport@gmail.com</p>
            </li>
          </ul>
        </div>

        <div className="col-6 col-md-2 mb-4">
          <h5 className="text-white" style={{ fontFamily: "'Harmattan', sans-serif", fontSize: "30px" }}><b>Legal</b></h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-white">Terms and Conditions</Link></li>
          </ul>
        </div>

        <div className="col-md-5 offset-md-1 mb-3">
          <form>
            <h5 className="text-white" style={{ fontFamily: "'Harmattan', sans-serif", fontSize: "30px" }}><b>Feedback</b></h5>

            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
              <label htmlFor="newsletter1" className="visually-hidden">Feedback</label>
              <input id="newsletter1" type="text" className="form-control" placeholder="Your feedback" />
              <button className="btn btn-dark text-white" type="button" style={{ fontFamily: "'Harmattan', sans-serif", fontSize: "20px" }}>Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row justify-content-between py-8 my-7 border-top text-white">
        <p>&copy; 2024 Bajra Palaa</p>
        <ul className="list-unstyled d-flex">
          {/* Empty Links Removed */}
          <li className="ms-3"><Link className=" text-white link-body-emphasis text-decoration-none" to="#">Privacy Policy</Link></li>
          <li className="ms-3"><Link className="text-white link-body-emphasis text-decoration-none" to="#">Sitemap</Link></li>
          <li className="ms-3"><Link className="text-white link-body-emphasis text-decoration-none" to="#">FAQ</Link></li>
        </ul>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
