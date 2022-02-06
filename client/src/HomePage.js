import { useEffect } from 'react';
import YourTripsCard from './components/YourTripsCard';
import './HomePage.css';

function HomePage() {

  useEffect(() => {
    fetch("http://localhost:5000/")
    .then(res => console.log(res.json()))
    .then(data=> console.log(data))
  },);

  return (
  <div>
    {/* the Navbar div */}
    <div className='headline'>

      <div>
        <nav className="navbar navbar-light fixed-top">
          <div className="container-fluid">
            <div className='avatar'><button className='avatarBtn'>avatar</button></div>
            <div className='title'><h1>Welcome To TripTremp</h1></div>

            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    {/* the Search input */}
    <div className='search'>
      <input placeholder='your destination...'></input>
      <button>search</button>
    </div>

    <div className='yourTripsCard'>
        <YourTripsCard/>
    </div>
    
  </div>
  );
}

export default HomePage;
