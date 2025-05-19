import React, { useState } from "react";
import { Button, Card, Grid } from "@radix-ui/themes";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

// Component for individual food item card
const FoodItemCard = ({ item, isSelected, onToggle, priceInfo, children }) => (
  <Card style={{ maxWidth: 350 }} size="2">
    <img 
      src={item.image} 
      alt={item.name}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0'
      }}
    />
    <div style={{ padding: '16px' }}>
      <h3 style={{ marginBottom: '8px' }}>{item.name}</h3>
      {priceInfo}
      {children}
      {onToggle && (
        <div className="form-check" style={{ marginTop: '12px' }}>
          <input
            type="checkbox"
            className="form-check-input"
            id={`item-${item.name}`}
            checked={isSelected}
            onChange={onToggle}
          />
          <label className="form-check-label" htmlFor={`item-${item.name}`}>
            Add to Order
          </label>
        </div>
      )}
    </div>
  </Card>
);

// Component for price summary card
const PriceSummaryCard = ({ basePricePerPlate, additionalCost, totalPrice, onConfirm, selectedItems, selectedDesserts }) => (
  <Card style={{ width: '23rem' }}>
    <div style={{ padding: '20px' }}>
      <h4 style={{ marginBottom: '16px' }}>Order Summary</h4>
      <div className="price-details">
        <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Base Price per Plate:</span>
          <span>Rs. {basePricePerPlate}</span>
        </div>
        {selectedItems.length > 0 && (
          <div>
            <h5 style={{ marginTop: '16px' }}>Additional Items:</h5>
            {selectedItems.map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{item}</span>
                <span>Rs. {item === "Mutton curry" ? getMuttonCurryPrice(peopleCount) : getMixFruitsPrice(peopleCount)}</span>
              </div>
            ))}
          </div>
        )}
        {selectedDesserts.length > 0 && (
          <div>
            <h5 style={{ marginTop: '16px' }}>Desserts:</h5>
            {selectedDesserts.map(dessert => (
              <div key={dessert} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{dessert}</span>
                <span>Rs. {dessertPrices[dessert] * peopleCount}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '8px' }}>
          <span>Additional Items Total:</span>
          <span>Rs. {additionalCost}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Delivery Charge:</span>
          <span>Rs. 1000</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>Rs. {totalPrice}</span>
        </div>
      </div>
      <Button variant="solid" color="red" style={{ width: '100%', marginTop: '20px' }} onClick={onConfirm}>
        Confirm Order
      </Button>
    </div>
  </Card>
);

const ViewItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { peopleCount } = location.state || { peopleCount: 0 };

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBeansType, setSelectedBeansType] = useState("");
  const [selectedDesserts, setSelectedDesserts] = useState([]);

  const basePricePerPlate = 500;

  // Define compulsory items
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

  // Define additional items
  const additionalItems = [
    { name: "Mutton curry", image: "/images/dyaakula.jpg" },
    { name: "Fish", image: "/images/fishfry.jpg" },
    { name: "Farsi", image: "/images/pump.jpeg" },
    { name: "Laisu", image: "/images/laisu.jpg" },
    { name: "Mix Fruits", image: "/images/salad.jpeg" },
    { name: "Juice", image: "/images/coke.webp" },
  ];

  // Define dessert prices
  const dessertPrices = {
    "Laalmon": 50,
    "Payesh": 60,
    "Rosogolla": 40
  };

  // Price calculation functions
  const getMuttonCurryPrice = (count) => count * 200;
  const getMixFruitsPrice = (count) => count * 50;

  const handleItemToggle = (itemName) => {
    setSelectedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const handleBeansSelection = (type) => {
    setSelectedBeansType(type);
  };

  const handleDessertSelection = (type) => {
    setSelectedDesserts(prev => 
      prev.includes(type)
        ? prev.filter(dessert => dessert !== type)
        : [...prev, type]
    );
  };

  // Calculate total price
  const combinedItems = [...selectedItems, ...selectedDesserts];
  const additionalCost = combinedItems.reduce((total, itemName) => {
    if (itemName === "Mutton curry") {
      return total + getMuttonCurryPrice(peopleCount);
    } else if (itemName === "Mix Fruits") {
      return total + getMixFruitsPrice(peopleCount);
    } else if (dessertPrices[itemName]) {
      return total + (dessertPrices[itemName] * peopleCount);
    }
    return total;
  }, 0);
  const totalPrice = peopleCount * basePricePerPlate + additionalCost + 1000;

  return (
    <>
      <Navbar className="sticky-navbar" />
      <div className="container mt-4">
        <h2 style={{ marginBottom: '24px' }}>Customize Your Feast</h2>
        
        <div className="row">
          {/* Left side - Food items */}
          <div className="col-md-8">
            {/* Compulsory Items */}
            <h4 className="mb-4">Basic Compulsory Items</h4>
            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              {compulsoryItems.map((item) => (
                <FoodItemCard 
                  key={item.name}
                  item={item}
                  children={
                    item.name === "Beans" && (
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
                    )
                  }
                />
              ))}
            </Grid>

            <hr className="my-4" />

            {/* Additional Items */}
            <h4 className="mb-4">Additional Items</h4>
            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              {additionalItems.map((item) => (
                <FoodItemCard 
                  key={item.name}
                  item={item}
                  isSelected={selectedItems.includes(item.name)}
                  onToggle={() => handleItemToggle(item.name)}
                  priceInfo={
                    item.name === "Mutton curry" ? (
                      <p>Price: Rs. {getMuttonCurryPrice(peopleCount)} (Up to {peopleCount} people)</p>
                    ) : item.name === "Mix Fruits" ? (
                      <p>Price: Rs. {getMixFruitsPrice(peopleCount)} (Up to {peopleCount} people)</p>
                    ) : null
                  }
                />
              ))}
            </Grid>

            {/* Desserts */}
            <h4 className="mt-4 mb-4">Desserts</h4>
            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              {Object.entries(dessertPrices).map(([dessert, price]) => (
                <FoodItemCard 
                  key={dessert}
                  item={{
                    name: dessert,
                    image: `/images/${dessert.toLowerCase() === 'laalmon' ? 'lalmon.jpg' : dessert.toLowerCase() + '.jpg'}`
                  }}
                  isSelected={selectedDesserts.includes(dessert)}
                  onToggle={() => handleDessertSelection(dessert)}
                  priceInfo={<p>Price: Rs. {price} per person</p>}
                />
              ))}
            </Grid>
          </div>

          {/* Right side - Price summary */}
          <div className="col-md-4">
            <div className="position-fixed" style={{ top: '12rem' }}>
              <PriceSummaryCard 
                basePricePerPlate={basePricePerPlate}
                additionalCost={additionalCost}
                totalPrice={totalPrice}
                selectedItems={selectedItems}
                selectedDesserts={selectedDesserts}
                onConfirm={() => navigate("/confirm", { state: { peopleCount, totalPrice } })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItems;
