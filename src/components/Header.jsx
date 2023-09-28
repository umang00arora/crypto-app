import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="">
            Crypto-APP
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
