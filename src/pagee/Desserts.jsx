import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../component/Navbar';


 const FoodItem = ({name , image, description, types, desc , showtypes ="true"})=>
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
const Desserts = () => {
 
   
    const menuItems = [
    {
        name: "Laalmon",
        image: "images/Laalmon.jpeg",
        description: "Laalmon is a deep-fried, sugar-soaked sweet similar to Rasbari but with a firmer texture and a deep reddish-brown color. ",
        types: [
          {name: "Plain", price:50},
          
         
        ],
        
        
      },
      {
        name: "Rasbari",
        image: "images/rasbari.jpg",
        description: "Rasbari is a soft, spongy, and syrup-soaked milk-based sweet, similar to the Indian Rasgulla. ",
        types: [
          {name: "Plain", price:80},
          
         
        ],
        
      },
      {
        name: "Barfi",
        image: "images/barfi.jpeg",
        description: "Barfi is a dense, milk-based sweet that comes in various flavors, such as coconut, chocolate, and pistachio.",
        types: [
          {name: "Plain", price:80},
          
         
        ],
        
      },
      {
        name: "Jerry",
        image: "images/jerry.jpeg",
        description: "Jerry, also known as Jalebi, is a deep-fried, spiral-shaped sweet soaked in sugar syrup. ",
        types: [
          {name: "Plain", price:80},
          
         
        ],
        
      },
      {
        name: "Lakhamari",
        image: "images/lakhamari.webp",
        description: "Lakhamari is a traditional Newari sweet known for its hard, crunchy texture and mildly sweet taste. Made from flour, sugar, and ghee, this delicacy comes in different shapes and sizes. ",
        types: [
          {name: "Plain", price:80},
          
         
        ],
        
      },
      {
        name: "Juju Dhau",
        image: "images/juju.webp",
        description: "Juju Dhau, meaning King of Yogurt, is a creamy, rich, and sweet yogurt from Bhaktapur. ",
        types: [
          {name: "Plain", price:80},
        ],
        
      },
      {
        name: "Yomari",
        image: "images/yomari.png",
        description: "This steamed dumpling is made from rice flour and filled with sweet molasses (chaku) or khuwa (milk solids).",
        types: [
          {name: "Chaku", price:70},
          {name:"Khuwa",price:80},
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
export default Desserts