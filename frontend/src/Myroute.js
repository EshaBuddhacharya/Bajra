import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Homepagee from './pagee/Homepagee';
import SignInpage from './pagee/SignInpage';
import Registerpage from './pagee/Registerpage';
import Forgotpass from './pagee/Forgotpass';
import Menu from './pagee/Menu';
import Veg from './pagee/Veg';
import Nonveg from './pagee/Nonveg';
import Drinks from './pagee/Drinks';
import Desserts from './pagee/Desserts';
import Feastpack from './pagee/Feastpack';
import Viewitem from './pagee/Viewitem';
import ConfirmOrder from './pagee/ConfirmOrder';
import OrderSum from './pagee/OrderSum';
import Cartpage from './pagee/Cartpage';
import Confirm from './pagee/Confirm';
import Orderri from './pagee/Orderri';
import Ok from './pagee/Ok';


const Myroute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepagee />} />
          <Route path="/signin" element={<SignInpage />} />
          <Route path = "/registerin" element = {<Registerpage/>}/>
          <Route path = "/forgotpass" element = {<Forgotpass/>}/>
          <Route path = "/showitems" element = {<Menu/>}/>
          <Route path ="/veg" element = {<Veg/>}/>
          <Route path ="/nonveg" element = {<Nonveg/>}/>
          <Route path = "/drinks" element={<Drinks/>}/>
          <Route path = "/desserts" element = {<Desserts/>}/>
          <Route path = "/feastpacks" element = {<Feastpack/>}/>
          <Route path = '/view' element = {<Viewitem/>}/>
          <Route path = '/confirm' element = {<ConfirmOrder/>}/>     
          <Route path = "/ordersum" element = {<OrderSum/>}/> 
          <Route path = "/cart" element = {<Cartpage/>}/>
          <Route path = "/confirmm" element = {<Confirm/>}/>
          <Route path ="/order" element ={<Orderri/>}/>
          <Route path ="/okpage" element ={<Ok/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default Myroute;
