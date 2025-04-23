import React from 'react';

const Homepagee = () => {
  return (
    <>
      {/* Top Section */}
      <div style={{ display: 'flex', width: '100%', height: '0vh' }}>
        {/* Left Section */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            paddingTop: '0px',
            paddingLeft: '60px',
            textAlign: 'center',
            gap: '10%',
          }}
        >
          <img src="images/yomari.png" alt="Yomari, a traditional Newari dessert" />
          <img src="images/chatamari.jpg" alt="Chatamari, a Newari-style pancake" />
          <img src="images/tho.jpg" alt="Tho, a traditional Newari dish" />
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
              paddingBottom: '29%',
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
          height: '1000px',
          paddingTop: '139px',
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
