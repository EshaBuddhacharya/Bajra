import React from 'react';
import Header from '../component/Header'
import { Link } from 'react-router-dom';

const Homepagee = () => {
  return (
    <>
      {/* Top Section */}
      <div style={{ display: 'flex', width: '100%' }}>
        {/* Left Section */}
        <div
          style={{
            flex: 1,
            padding: '',
            paddingTop: '0px',
            paddingLeft: '',
            textAlign: 'center',
            gap: '',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Header />
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', flexGrow: '1', gap: '10px' }}>
            <span style={{ fontSize: '2rem', fontWeight: '500' }}>
              Authentic Newari Cuisine, <br />Just a click away
            </span>
            <Link 
              to="/showItems" 
              className="btn btn-danger me-2" 
              onClick={() => console.log('Navigating to /menu')}
              style={{paddingLeft: '25px', paddingRight: '25px', paddingTop: '10px', paddingBottom: '10px'}}
            >
              Explore menu
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/images/wholeitem.png"
            alt="Complete Newari meal set"
            style={{

            }}
          />
        </div>
      </div>

      {/* Banner Image */}
      <img
        src="/images/banner.png"
        alt="Newari cuisine banner"
        style={{
          width: '100%',
          height: '700px',
          paddingTop: '',
          paddingBottom: '90px',
        }}
      />

      {/* Bottom Section */}
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Left Section */}
        <div
          className="left"
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: 'white',
              backgroundColor: '#dc3545',
              fontFamily: "'Harmattan', sans-serif",
              padding: '0px 10px 10px',
            }}
          >
            Essence of Newari Cuisine
          </h1>
          <h1
            style={{
              fontFamily: "'Harmattan', sans-serif",
              backgroundColor: '#f2f2f2',
              borderRadius: '10% 10% 80% 80%',
              padding: '90px 30px',
              textAlign: 'center',
              width: 'fit-content',
              marginBottom: '20px',
            }}
          >
            Experience the true taste of
            <br /> Newari culture with dishes
            <br /> made from locally sourced
            <br /> ingredients.
          </h1>

          <h1
            style={{
              fontFamily: "'Harmattan', sans-serif",
              backgroundColor: '#f2f2f2',
              borderRadius: '10% 10% 80% 80%',
              padding: '90px 30px',
              textAlign: 'center',
              width: 'fit-content',
              marginBottom: '90px',
            }}
          >
            Discover a variety of Newari
            <br /> delicacies, from Samay
            <br /> Baji to Yomari, for
            <br /> every craving.
          </h1>
        </div>

        {/* Right Section */}
        <div
          className="right "
          style={{
            width: '50%',
            height: '85%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src="/images/phone.png" alt="Phone displaying Newari cuisine" />
        </div>
      </div>
    </>
  );
};

export default Homepagee;
