
import React, {useState} from 'react'
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const FoodItem = ({ name, image, description, types, desc , showtypes = true}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(types[0].name);
  const [price, setPrice] = useState(types[0].price);
  const maxQuantity = 10;

  const handleQuantityChange = (value) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + value, maxQuantity)));
  };

  const handleTypeChange = (type) => {
    setSelectedType(type.name);
    setPrice(type.price);
  };

  return (
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
  );
}

const Veg = () => {
  
    
    const menuItems = [
      
        {
            name: "Mushroom Choila",
            image: "images/mushroom.jpg",
            description: "Mushroom Choila are marinated in a blend of aromatic spices, mustard oil, garlic, and ginger, then grilled or pan-fried to perfection. ",
            types: [
              { name: "Mushroom", price:180},
            ],
            
          },
          {
            name: "Wo",
            image: "images/wo.jpg",
            description: "Roti made  in newari styles using Lentils.",
            types: [
              { name: "Lentils", price:40},
            ],
            
          },
          {
            name: "Chatamari",
            image: "images/chatamari.webp",
            description: "Thin Roti made  in newari styles using rice flour.",
            types: [
              { name: "Plain", price:40},
              {name : "With egg",price:80},
              {name :" With meat", price:100},
              {name:"With egg and meat",price:150},
              {name: "Mix", price:180}
            ],
            
          },
          {
            name: "Aalu Tama",
            image: "images/aalutama.jpg",
            description: "Nepali dish made with potatoes (Aalu) and bamboo shoots (Tama). ",
            types: [
              {name: "Plain", price:40},
             
            ],
            
          },
          {
            name: "Bhatmas And Gundruk Sadeko",
            image: "images/bhatmas.jpg",
            description: "This dish features roasted soybeans mixed with gundruk ,spices and herbs, offering a crunchy and savory snack.",
            types: [
              {name: "Bhatmas", price:50},
              {name:"Gundruk", price:50},
              {name : "Both",price:100},
             
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
          {
            name: "Kwati",
            image: "images/kwati.jpg",
            description: "Soup made from a mix of sprouted beans, including lentils, peas, and soybeans. It’s usually spiced with garlic, ginger, and local herbs, making it a wholesome and nutritious dish. ",
            types: [
              {name: "Mixed beans", price:150},
              
             
            ],
            
          },
          {
          name: "Khaja Set",
          image: "images/Wholeitem.png",
          description: " Veg: Baji(Chiura), Spinach,Beans, Mushroom Choila, Aalu Tama, Bhatmas Saadeko,Mix achar,Aalu Saadeko",
          types: [
            {name: "Veg", price:500},
            
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
};


export default Veg;