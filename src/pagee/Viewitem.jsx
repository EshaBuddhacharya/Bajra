import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const compulsoryItems = [
  { name: "Chiura", image: "/images/Chuira.webp" },
  { name: "Buff curry", image: "/images/dyaakula.jpg" },
  { name: "Bhuttan", image: "/images/bhutan.png" },
  { name: "Pickles", image: "/images/mulaachar.webp" },
  { name: "Spinach", image: "/images/spinach.jpeg" },
  { name: "Beans", image: "/images/bodi.jpg", types: ["Bodi", "Rajma"] },
  { name: "Aela", image: "/images/local.jpeg" },
  { name: "Paukwaa", image: "/images/paukwa.jpeg" },
  { name: "Mushroom", image: "/images/mushroom.jpg" },
  { name: "Cauliflower", image: "/images/cauli.jpg" },
  { name: "Dahi", image: "/images/juju.webp" },
  { name: "Aalu Tama", image: "/images/aalutama.jpg" },
];

const additionalItems = [
  { name: "Mutton curry", image: "/images/dyaakula.jpg" },
  { name: "Fish", image: "/images/fishfry.jpg" },
  { name: "Farsi", image: "/images/pump.jpeg" },
  { name: "Laisu", image: "/images/laisu.jpg" },
  { name: "Mix Fruits", image: "/images/salad.jpeg" },
  { name: "Juice", image: "/images/coke.webp" },
];

const dessertPrices = {
  Barfi: 30,
  Laalmon: 30,
  Rasbari: 50,
};

const ViewItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { peopleCount } = location.state || { peopleCount: 0 };

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBeansType, setSelectedBeansType] = useState("");
  const [selectedDesserts, setSelectedDesserts] = useState([]);

  const basePricePerPlate = 500;

  const handleItemToggle = (itemName) => {
    let updatedItems = [...selectedItems];

    if (selectedItems.includes(itemName)) {
      updatedItems = selectedItems.filter((item) => item !== itemName);
    } else {
      updatedItems.push(itemName);
    }

    setSelectedItems(updatedItems);
  };

  const handleBeansSelection = (type) => {
    setSelectedBeansType(type);
  };

  const handleDessertSelection = (type) => {
    setSelectedDesserts((prev) => {
      if (prev.includes(type)) {
        return prev.filter((dessert) => dessert !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // Price calculation for Mutton curry
  const getMuttonCurryPrice = (peopleCount) => {
    if (peopleCount <= 100) return 15000;
    if (peopleCount <= 150) return 22000;
    if (peopleCount <= 200) return 30000;
    if (peopleCount <= 250) return 37000;
    if (peopleCount <= 300) return 45000;
    if (peopleCount <= 350) return 52000;
    if (peopleCount <= 400) return 60000;
    if (peopleCount <= 450) return 67000;
    if (peopleCount <= 500) return 75000;
    return 0;
  };

  // Price calculation for Mix Fruits
  const getMixFruitsPrice = (peopleCount) => {
    if (peopleCount <= 100) return 200;
    if (peopleCount <= 200) return 400;
    if (peopleCount <= 300) return 600;
    if (peopleCount <= 400) return 800;
    if (peopleCount <= 500) return 1000;
    return 0;
  };

  // Price calculation for Fish
  const getFishPrice = (peopleCount) => {
    if (peopleCount <= 100) return 10000;
    if (peopleCount <= 150) return 15000;
    if (peopleCount <= 200) return 20000;
    if (peopleCount <= 250) return 25000;
    if (peopleCount <= 300) return 30000;
    if (peopleCount <= 350) return 35000;
    if (peopleCount <= 400) return 40000;
    if (peopleCount <= 450) return 45000;
    if (peopleCount <= 500) return 50000;
    return 0;
  };

  // Price calculation for Farsi (same as Laisu)
  const getFarsiPrice = (peopleCount) => {
    if (peopleCount <= 100) return 700;
    if (peopleCount <= 150) return 1000;
    if (peopleCount <= 200) return 1400;
    if (peopleCount <= 250) return 1700;
    if (peopleCount <= 300) return 2000;
    if (peopleCount <= 350) return 2300;
    if (peopleCount <= 400) return 2600;
    if (peopleCount <= 450) return 2900;
    if (peopleCount <= 500) return 3200;
    return 0;
  };

  // Price calculation for Laisu (same as Farsi)
  const getLaisuPrice = (peopleCount) => getFarsiPrice(peopleCount);

  // Price calculation for Juice
  const getJuicePrice = (peopleCount) => {
    if (peopleCount <= 100) return 6000;
    if (peopleCount <= 150) return 9000;
    if (peopleCount <= 200) return 12000;
    if (peopleCount <= 250) return 15000;
    if (peopleCount <= 300) return 18000;
    if (peopleCount <= 350) return 21000;
    if (peopleCount <= 400) return 24000;
    if (peopleCount <= 450) return 27000;
    if (peopleCount <= 500) return 30000;
    return 0;
  };

  // Combine selected desserts into additional items
  const combinedItems = [...selectedItems, ...selectedDesserts];

  // Calculate additional item cost (including desserts, Mix Fruits, and Juice)
  const additionalCost = combinedItems.reduce((total, itemName) => {
    const item = additionalItems.find((i) => i.name === itemName);
    if (item) {
      if (item.name === "Mutton curry") {
        return total + getMuttonCurryPrice(peopleCount); // Apply Mutton curry price logic
      }
      if (item.name === "Mix Fruits") {
        return total + getMixFruitsPrice(peopleCount); // Apply Mix Fruits price logic
      }
      if (item.name === "Fish") {
        return total + getFishPrice(peopleCount); // Apply Fish price logic
      }
      if (item.name === "Farsi") {
        return total + getFarsiPrice(peopleCount); // Apply Farsi price logic
      }
      if (item.name === "Laisu") {
        return total + getLaisuPrice(peopleCount); // Apply Laisu price logic
      }
      if (item.name === "Juice") {
        return total + getJuicePrice(peopleCount); // Apply Juice price logic
      }
      return total + (item.price || 0) * peopleCount; // For other items, apply normal price
    }
    const dessertPrice = dessertPrices[itemName];
    if (dessertPrice) {
      return total + dessertPrice * peopleCount; // Dessert cost based on quantity
    }
    return total;
  }, 0);

  // Total Price Calculation
  const totalPrice = peopleCount * basePricePerPlate + additionalCost + 1000; // Including Rs. 1000 delivery charge

  const handleConfirmClick = () => {
    navigate("/confirm", { state: { peopleCount, totalPrice } });
  };

  return (
    <>
      <Navbar className="sticky-navbar" />
      <div className="container mt-3">
        <h2>Customize Your Feast</h2>
        
        {/* Compulsory Items */}
        <h4 className="mt-3 textorder">Basic Compulsory Items</h4>
        <div className="row">
          {compulsoryItems.map((item) => (
            <div key={item.name} className="col-md-4 mb-3">
              <Card className="shadow food-card">
                <Card.Img variant="top" src={item.image} alt={item.name} className="food-image" />
                <Card.Body className="food-card-body">
                  <Card.Title>{item.name}</Card.Title>

                  {item.name === "Beans" && (
                    <div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
                      {item.types.map((type) => (
                        <div key={type} className="form-check form-check-inline">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="beansType"
                            id={`beans-${type}`}
                            checked={selectedBeansType === type}
                            onChange={() => handleBeansSelection(type)}
                          />
                          <label className="form-check-label" htmlFor={`beans-${type}`}>
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
<hr></hr>
        {/* Additional Items */}
        <h4 className="mt-3 textorder">Additional Items</h4>
        <div className="row">
          {additionalItems.map((item) => (
            <div key={item.name} className="col-md-4 mb-3">
              <Card className="shadow food-card">
                <Card.Img variant="top" src={item.image} alt={item.name} className="food-image" />
                <Card.Body className="food-card-body">
                  <Card.Title>{item.name}</Card.Title>

                  {item.name === "Mutton curry" && (
                    <div>
                      <p>Price: Rs. {getMuttonCurryPrice(peopleCount)} (Up to {peopleCount} people)</p>
                    </div>
                  )}

                  {item.name === "Mix Fruits" && (
                    <div>
                      <p>Price: Rs. {getMixFruitsPrice(peopleCount)} (Up to {peopleCount} people)</p>
                    </div>
                  )}

                  {item.name === "Fish" && (
                    <div>
                      <p>Price: Rs. {getFishPrice(peopleCount)} (Up to {peopleCount} people)</p>
                    </div>
                  )}

                  {item.name === "Farsi" && (
                    <div>
                      <p>Price: Rs. {getFarsiPrice(peopleCount)} (Up to {peopleCount} people)</p>
                    </div>
                  )}

                  {item.name === "Laisu" && (
                    <div>
                      <p>Price: Rs. {getLaisuPrice(peopleCount)} (Up to {peopleCount} people)</p>
                    </div>
                  )}

                  {item.name === "Juice" && (
                    <div>
                      <p>Price: Rs. {getJuicePrice(peopleCount)} (Up to {peopleCount} people)</p>
                    </div>
                  )}

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`remove-${item.name}`}
                      checked={selectedItems.includes(item.name)}
                      onChange={() => handleItemToggle(item.name)}
                    />
                    <label className="form-check-label" htmlFor={`remove-${item.name}`}>
                      Add to Order
                    </label>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* Dessert Items */}
        <h4 className="mt-3">Desserts</h4>
        <div className="row">
          {Object.keys(dessertPrices).map((dessert) => (
            <div key={dessert} className="col-md-4 mb-3">
              <Card className="shadow food-card">
                <Card.Img variant="top" src={`/images/${dessert.toLowerCase() === 'laalmon' ? 'lalmon.jpg' : dessert.toLowerCase() + '.jpg'}`} alt={dessert} className="food-image" />
                <Card.Body className="food-card-body">
                  <Card.Title>{dessert}</Card.Title>
                  <p>Price: Rs. {dessertPrices[dessert]} per person</p>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`dessert-${dessert}`}
                      checked={selectedDesserts.includes(dessert)}
                      onChange={() => handleDessertSelection(dessert)}
                    />
                    <label className="form-check-label" htmlFor={`dessert-${dessert}`}>
                      Add to Order
                    </label>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div className="sticky-bottom-price">
        {/* Pricing Details */}
        <h4 className="mt-3">Price per plate: Rs. {basePricePerPlate}</h4>
        <h4>Additional Item Cost: Rs. {additionalCost}</h4>
        <h4>Delivery Charge: Rs. 1000</h4>
        <h4>Total Price: Rs. {totalPrice}</h4>

        <Button variant="danger" className="mt-3" onClick={handleConfirmClick}>
          Confirm Order
        </Button>
      </div>
      </div>
    </>
  );
};

export default ViewItems;
