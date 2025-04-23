import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';


const FoodItem = ({name, image, description, types, desc,showtypes= true})=>
{
    const [quantity , setQuantity] = useState(1);
    const [selectedType, setSelectedType] = useState(types[0].name)
    const [price, setPrice] = useState(types[0].price)
    const maxQuantity = 10

    const handleQuantityChange =(value) =>
    {
        setQuantity((prev)=>Math.max(1, Math.min(prev + value, maxQuantity)));
    }

    const handleTypeChange =(type)=>
    {
        setSelectedType (type.name)
        setPrice(type.price)
    }

return(
    <div className="col">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body d-flex flex-column justify-content-between">
          <h4 className="card-title">{name}</h4>
          
         
          {description && <p className="card-text">{description}</p>}
          

          <div style={{ minHeight: "50px" }}>
            <ul className="list-unstyled">
              {types.map((type) => (
                <li key={type.name}>
                  {type.name}: Rs {type.price}
                </li>
              ))}
            </ul>
          </div>
          {desc && <b> <p className="card-text">{desc}</p></b>}

          <div className="d-flex justify-content-between">
            <button className="btn btn-light border-danger">
              Price: Rs {price * quantity}
            </button>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center w-100 mt-3">
            <div className="dropdown me-2">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Type: {selectedType}
              </button>
              <ul className="dropdown-menu">
                {types.map((type) => (
                  <li key={type.name}>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => handleTypeChange(type)}
                    >
                      {type.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="btn btn-danger"
              style={{ width: "120px" }}
              onClick={() =>
                console.log(
                  `Added ${quantity} items of ${selectedType} ${name} to cart`
                )
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>


)
}

const Nonveg = () => {
  const menuItems = 
  [
    {
        name: "Choila",
        image: "images/Buffchoila.jpg",
        description: "A spicy and flavorful dish made with marinated meat, served with rice.",
        types: [
          { name: "Buff", price: 180 },
          { name: "Chicken", price: 200 },
          { name: "Pork", price: 220 },
        ],
        desc:" 8 pieces per plate"
      },
      {
        name: "Kachila",
        image: "images/kachila.jpg",
        description: "A traditional raw minced meat dish mixed with spices and herbs.",
        types: [
          { name: "Buff", price: 180 },
          { name: "Chicken", price: 200 },
          { name: "Pork", price: 220 },
        ],
      },
      {
        name: "Dyaakula",
        image: "images/dyaakula.jpg",
        description: "A flavorful stew made from slow-cooked meat.",
        types: [{ name: "Buff", price: 250 }],
        desc:" 1 bowl : 4 pieces of meat"
      },
      {
        name: "Sekuwa",
        image: "images/sekuwa.jpg",
        description: "Grilled meat marinated with spices, usually served with chutney.",
        types: [
          { name: "Buff", price: 40 },
          { name: "Chicken", price: 60 },
          { name: "Pork", price: 80 },
        ],
        desc:" 6 pieces per stick"
      },
      {
        name: "Meatball(Laapichaa)",
        image: "images/Meatball.jpg",
        description: "Newari-style meatballs made from minced meat and spices.",
        types: [{ name: "Buff", price: 250 }],
        desc:" 5 pieces per plate"
      },
      {
        name: "Sapubhichaa",
        image: "images/sapu.jpg",
        description: "Tender marinated buffalo or goat meat cooked with aromatic spices for a rich, savory taste.",
        types: [
          { name: "Buff", price: 250 },
          { name: "Goat", price: 250 },
        ],
        desc:" 5 pieces per plate"
      },
      {
        name: "Takha",
        image: "images/takha.webp",
        description: "Nepali dish made from boiled meat, mixed with a tangy, spiced yogurt-based gravy, perfect for a refreshing and flavorful meal.",
        types: [
          { name: "Buff", price: 150 },
        ],
        
      },
      {
        name: "FishFry",
        image: "images/fishfry.jpg",
        description: "Crispy, golden-brown fried fish fillets seasoned with a blend of spices, perfect for a savory, crunchy delight.",
        types: [
          { name: "Mackerel", price:300},
        ],
        desc:" 5 pieces per plate"
      },
      {
        name: "Bhutan",
        image: "images/bhutan.png",
        description: "The goat meat is deep-fried until crispy, then seasoned with Newari achar masala, ",
        types: [
          { name: "Goat", price:150},
        ],
        desc:" 10 pieces per plate"
      },
      {
        name: "Khaja Set",
        image: "images/Wholeitem.png",
        description: "Non-veg :  Baji(Chiura),Spinach,Beans,Choila,Aalu Tama,Bhatmas Sadeko,Mix achar.",
        types: [
          {name: "Non-Veg", price:700},
      
        ],
      },
      {
        name: "Chatamari",
        image: "images/chatamari.webp",
        description: "Thin Roti made  in newari styles using rice flour.",
        types: [
         {name :" With meat", price:100}, 
          {name : "With egg",price:80},
          {name:"With egg and meat",price:150},
          {name: "Mix", price:180}
        ],
      },
    ]
      return (<>
      <Navbar/>
        <Button variant="danger mt-5 ms-2 ">
      <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
        Back
      </Link>
    </Button>
        <div className="row row-cols-1 row-cols-md-3 py-5 g-4">
          {menuItems.map((item, index) => (
            <FoodItem key={index} {...item} />
          ))}
        </div>
        <Button variant="danger mt-2 ms-2 ">
      <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
        Back
      </Link>
    </Button>
        </>
      );
    }
  

export default Nonveg