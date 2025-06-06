import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"
import {Flex} from '@radix-ui/themes'

const 
Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header
      style={{
        width: '100%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '20px'
      }}
    >
        <Link to='/' style={{ display: 'flex', textDecoration: 'none', color: 'black', alignItems: "center" }}>
          <img
            src="/images/b.png"
            alt="Logo"
            style={{
              height: '150px',
              width: '155px',
              '@media (maxWidth: 768px)': {
                height: '70px',
                width: '75px',
              }
            }}
          />
          <h1 style={{
            '@media (maxWidth: 768px)': {
              fontSize: '1.2rem'
            }
          }}
          >
            𑐰𑐖𑑂𑐬 <br />𑐥𑐮𑐵
          </h1>
        </Link>

        {/* Buttons Section */}
        <div className="d-flex" style={{ gap: '5px' }}>
          {isAuthenticated ? (
            <div>
              <button className="btn btn-danger" style={{ width: '120px' }} onClick={logout}> Logout </button>
            </div>
          ) : (
            <Flex direction={{initial: 'column', sm: 'row'}} gap="2">
              <div>
                <Link to="/signin" className="btn btn-dark" style={{ width: '120px' }} onClick={() => console.log('Navigating to /signin')}>
                  Sign in
                </Link>
              </div>
              <div>
                <Link to="/registerin" className="btn btn-danger" style={{ width: '120px' }} onClick={() => console.log('Navigating to /registerin')}>
                  Register
                </Link>
              </div>
            </Flex>
          )}
        </div>
    </header>
  );
};

export default Header;
