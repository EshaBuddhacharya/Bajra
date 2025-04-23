import React from 'react';
import Navbar from '../component/Navbar';
import Itemsshow from '../component/Itemsshow';

const Menu = () => {
  return (
    <>
      <Navbar/>
      <div className="mb-5">
        <Itemsshow/>
      </div>
    </>
  );
};

export default Menu;
