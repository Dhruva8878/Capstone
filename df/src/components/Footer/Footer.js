import "./Footer.css";

export const Footer = () => {
  return (
    <div
      className="container-fluid bg-dark text-light footer pt-5 wow fadeIn"
      data-wow-delay="0.1s"
      style={{ "margin-top": "6rem" }}
    >
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Address</h4>
            <p className="mb-2">
              123 Street, New York, USA
            </p>
            <p className="mb-2">
              +012 345 67890
            </p>
            <p className="mb-2">
             info@example.com
            </p>
            <div className="d-flex pt-2">
              <p className="btn btn-outline-light btn-social" href="">
                <i className="fab fa-twitter"></i>
              </p>
              <p className="btn btn-outline-light btn-social" href="">
                <i className="fab fa-facebook-f"></i>
              </p>
              <p className="btn btn-outline-light btn-social" href="">
                <i className="fab fa-youtube"></i>
              </p>
              <p className="btn btn-outline-light btn-social" href="">
                <i className="fab fa-linkedin-in"></i>
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Services</h4>
            <p className="btn btn-link" href="">
              Air Freight
            </p>
            <p className="btn btn-link" href="">
              Sea Freight
            </p>
            <p className="btn btn-link" href="">
              Road Freight
            </p>
            <p className="btn btn-link" href="">
              Logistic Solutions
            </p>
            <p className="btn btn-link" href="">
              Industry solutions
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Quick Links</h4>
            <p className="btn btn-link" href="">
              About Us
            </p>
            <p className="btn btn-link" href="">
              Contact Us
            </p>
            <p className="btn btn-link" href="">
              Our Services
            </p>
            <p className="btn btn-link" href="">
              Terms & Condition
            </p>
            <p className="btn btn-link" href="">
              Support
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Newsletter</h4>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            <div className="position-relative mx-auto" style={{"max-width": "400px"}}>
              <input
                className="form-control border-0 w-100 py-3 ps-4 pe-5"
                type="text"
                placeholder="Your email"
              />
              <button
                type="button"
                className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy;{" "}
              <p style={{display:"inline"}} className="border-bottom" href="#">
                CapStone
              </p>
              , All Right Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">Designed By ACS</div>
          </div>
        </div>
      </div>
    </div>
  );
};
