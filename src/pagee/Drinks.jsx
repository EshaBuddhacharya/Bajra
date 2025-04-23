import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';

const FoodItem=({ name , image, description, types,  desc , showtypes = true})=>
{
    const [quantity, setQuantity]= useState(1);
    const[selectedType, setSelectedTypes]= useState(types[0].name)
    const[price, setPrice]= useState(types[0].price)
    const maxQuantity = 10

    const handleQuantityChange =(value) =>
        {
            setQuantity((prev)=>Math.max(1, Math.min(prev + value, maxQuantity)));
        }
    
    const handleTypeChange=(type)=>
    {
            setSelectedTypes(type.name)
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
    


const Drinks = () => {

    const menuItems =[
        {
            name: "Tho",
            image: "images/tho.jpg",
            description: "Tho is a traditional alcoholic beverage made from fermented rice, milky, slightly sweet, and mildly alcoholic drink.",
            types: [
              {name: "Plain", price:100},
            ],
            desc:"Per litre 100"
          },
          {
            name: "Aela",
            image: "images/local.jpeg",
            description: "Aela is a traditional homemade alcoholic beverage in Nepal, distilled from grains like rice, millet, or barley. ",
            types: [
              {name: "Plain", price:120},
              
            ],
            desc:"Per litre 120"
          },
          {
            name: "Beer",
            image: "images/beer.webp",
            types: [
              {name: "Nepal Ice", price:250},
              {name : "Gorkha",price:300},
              {name:"Tuborg",price:450},
              {name:"Kasberg",price:450},
            ],
          },
          {
            name: "Lassi",
            image: "images/lassi.jpg",
            description: "Lassi is a refreshing yogurt-based drink enjoyed across Nepal. It can be served sweet, flavored with sugar, cardamom, and nuts, or as a salty version with a hint of spices.  ",
            types: [
              {name: "Plain", price:70},
              {name: "With Almonds", price:80},
              {name: "With Almonds and khuwa", price:100}
              
            ],
            desc:"Per glass 100"
          },
          {
            name: "Cold Drinks",
            image: "images/coke.webp",
            types: [
              {name: "Coke", price:80},
              {name: "Fanta", price:80},
              {name: "Sprite", price:80},
              {name: "Slice", price:70},
            ],
          },
          {
            name: "Khaja Set",
            image: "images/Wholeitem.png",
            description: "Non-veg :  Baji(Chiura),Spinach,Beans,Choila,Aalu Tama,Bhatmas Sadeko,Mix achar. Veg: Baji(Chiura), Spinach,Beans, Mushroom Choila, Aalu Tama, Bhatmas Saadeko,Mix achar,Aalu Saadeko",
            types: [
              {name: "Non-Veg", price:700},
              {name:"Veg",price:500},
            ],
          },
        ];
        return (
            <>
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
          <Navbar/>
        <Button variant="danger mt-5 ms-2 ">
      <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
        Back
      </Link>
    </Button>
    </>
        )
    }

export default Drinks