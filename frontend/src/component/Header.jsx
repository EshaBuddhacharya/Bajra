import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      className="p-3"
      style={{
        backgroundColor: '#fff',
      }}
    >
      <div className="d-flex justify-content-between" style={{ height: '300px' }}>
        <div className="d-flex align-items-center">
          <h1 style={{
              position: 'absolute',
              top: '2%',
              left: '14%',
              transform: 'translateX(-60%)',
              margin: 0,
            }}
          >
            𑐰𑐖𑑂𑐬 𑐥𑐮𑐵
          </h1>
          <img
            src="/images/b.png"
            alt="Logo"
            style={{
              height: '150px',
              width: '155px',
              marginRight: '60px',
              marginTop: '-130px',
              position: 'relative',
            }}
          />

          {/* Buttons Section */}
          <div className="d-flex" style={{ marginTop: '-233px', marginLeft: '150px' }}>
            <Link to="/signin" className="btn btn-dark me-2" style={{ width: '120px' }} onClick={() => console.log('Navigating to /signin')} >
              Sign in
            </Link>
            <Link to="/registerin" className="btn btn-danger" style={{ width: '120px' }} onClick={() => console.log('Navigating to /registerin')} >Register</Link>

            
          </div>
        </div>

        
        
       
      </div>
    </header>
  );
};

export default Header;
