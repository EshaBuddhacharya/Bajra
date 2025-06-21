import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Dialog, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../component/CartContext";

// Component for individual food item card
const FoodItemCard = ({ item, isSelected, onToggle, priceInfo, children }) => (
  <Card style={{ maxWidth: 350 }} size="2">
    <ItemImage src={item.image} alt={item.name} />
    <ItemDetails
      name={item.name}
      priceInfo={priceInfo}
      children={children}
      isSelected={isSelected}
      onToggle={onToggle}
      item={item}
    />
  </Card>
);

const ItemImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0'
    }}
  />
);

const ItemDetails = ({ name, priceInfo, children, isSelected, onToggle, item }) => (
  <div style={{ padding: '16px' }}>
    <h3 style={{ marginBottom: '8px' }}>{name}</h3>
    {priceInfo}
    {children}
    {onToggle && (
      <ItemCheckbox
        isSelected={isSelected}
        onToggle={onToggle}
        itemName={item.name}
      />
    )}
  </div>
);

const ItemCheckbox = ({ isSelected, onToggle, itemName }) => (
  <div className="form-check" style={{ marginTop: '12px' }}>
    <input
      type="checkbox"
      className="form-check-input"
      id={`item-${itemName}`}
      checked={isSelected}
      onChange={onToggle}
    />
    <label className="form-check-label" htmlFor={`item-${itemName}`}>
      Add to Order
    </label>
  </div>
);

const OrderSummarySection = ({ title, items, itemsData }) => (
  items.length > 0 && (
    <div>
      <h5 style={{ marginTop: '16px' }}>{title}:</h5>
      {items.map(itemId => {
        const item = itemsData.find(i => i._id === itemId);
        return (
          <div key={itemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>{item?.name}</span>
            <span>Rs. {item?.pricePerPerson}</span>
          </div>
        );
      })}
    </div>
  )
);

const PriceSummaryCard = ({ basePricePerPlate, additionalCost, totalPrice, onOpenDialog, selectedItems, selectedDesserts, itemsData }) => (
  <Card style={{ width: '23rem' }}>
    <div style={{ padding: '20px' }}>
      <h4 style={{ marginBottom: '16px' }}>Order Summary</h4>
      <PriceSummaryDetails
        basePricePerPlate={basePricePerPlate}
        additionalCost={additionalCost}
        totalPrice={totalPrice}
        selectedItems={selectedItems}
        selectedDesserts={selectedDesserts}
        itemsData={itemsData}
      />
      <Button variant="solid" color="red" style={{ width: '100%', marginTop: '20px' }} onClick={onOpenDialog}>
        Confirm Order
      </Button>
    </div>
  </Card>
);

const PriceSummaryDetails = ({ basePricePerPlate, additionalCost, totalPrice, selectedItems, selectedDesserts, itemsData }) => (
  <div className="price-details">
    <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span>Base Price per Plate:</span>
      <span>Rs. {basePricePerPlate}</span>
    </div>
    <OrderSummarySection title="Additional Items" items={selectedItems} itemsData={itemsData} />
    <OrderSummarySection title="Desserts" items={selectedDesserts} itemsData={itemsData} />
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
);

const ItemsGrid = ({ title, items, selectedItems, onToggle, selectedBeansType, onBeansSelection }) => (
  <>
    <h4 className="mb-4">{title}</h4>
    <Grid columns={{ initial: "1", sm: "2" }} gap="4">
      {items.map((item) => (
        <FoodItemCard
          key={item._id}
          item={item}
          isSelected={selectedItems?.includes(item._id)}
          onToggle={onToggle ? () => onToggle(item._id) : null}
          priceInfo={item.pricePerPerson && <p>Price: Rs. {item.pricePerPerson} per person</p>}
          children={
            item.subTypes?.length > 0 && (
              <BeansTypeSelector
                types={item.subTypes}
                selectedType={selectedBeansType}
                onSelect={onBeansSelection}
              />
            )
          }
        />
      ))}
    </Grid>
  </>
);

const BeansTypeSelector = ({ types, selectedType, onSelect }) => (
  <div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
    {types.map((type) => (
      <div key={type} className="form-check form-check-inline">
        <input
          type="radio"
          className="form-check-input"
          name="beansType"
          id={`beans-${type}`}
          checked={selectedType === type}
          onChange={() => onSelect(type)}
        />
        <label className="form-check-label" htmlFor={`beans-${type}`}>
          {type}
        </label>
      </div>
    ))}
  </div>
);

const OrderConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      deliveryAddress,
      additionalInstructions,
      orderDate,
    });
    onClose();
  };

  const minOrderDate = new Date();
  minOrderDate.setDate(minOrderDate.getDate() + 7);
  const minOrderDateString = minOrderDate.toISOString().split("T")[0];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Confirm Your Order</Dialog.Title>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="deliveryAddress" className="form-label">
              Delivery Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="additionalInstructions" className="form-label">
              Additional Instructions
            </label>
            <textarea
              className="form-control"
              id="additionalInstructions"
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="orderDate" className="form-label">
              Order Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="orderDate"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              min={minOrderDateString}
              required
            />
          </div>
          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const ViewItems = () => {
  const navigate = useNavigate();
  const { axiosInstance, isAuthenticated } = useAuth();
  const { peopleCount, basePricePerPlate } = useCart();

  const [itemsData, setItemsData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBeansType, setSelectedBeansType] = useState("");
  const [selectedDesserts, setSelectedDesserts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deliveryCharge = 1000;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/api/feast/items');
        setItemsData(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [axiosInstance]);

  const compulsoryItems = itemsData.filter(item => item.category === 'compulsory');
  const additionalItems = itemsData.filter(item => item.category === 'additional');
  const dessertItems = itemsData.filter(item => item.category === 'dessert');

  const handleItemToggle = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(item => item !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBeansSelection = (type) => {
    setSelectedBeansType(type);
  };

  const handleDessertSelection = (itemId) => {
    setSelectedDesserts(prev =>
      prev.includes(itemId)
        ? prev.filter(dessert => dessert !== itemId)
        : [...prev, itemId]
    );
  };

  const additionalCost = [...selectedItems, ...selectedDesserts].reduce((total, itemId) => {
    const item = itemsData.find(i => i._id === itemId);
    return total + (item?.pricePerPerson || 0) * peopleCount;
  }, 0);

  const totalPrice = peopleCount * basePricePerPlate + additionalCost + deliveryCharge;

  const confirmOrder = async (formData) => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    if (!selectedBeansType && compulsoryItems.some(item => item.subTypes?.length > 0)) {
      alert("Please select a beans type");
      return;
    }

    try {
      const orderData = {
        peopleCount,
        compulsoryItems: compulsoryItems.map(item => ({
          item: item._id,
          selectedSubType: item.subTypes?.length > 0 ? selectedBeansType : null
        })),
        additionalItems: selectedItems.map(itemId => {
          const item = itemsData.find(i => i._id === itemId);
          return {
            item: itemId,
            pricePerPerson: item.pricePerPerson
          };
        }),
        desserts: selectedDesserts.map(itemId => {
          const item = itemsData.find(i => i._id === itemId);
          return {
            item: itemId,
            pricePerPerson: item.pricePerPerson
          };
        }),
        basePricePerPlate,
        deliveryCharge,
        totalPrice,
        deliveryLocation: formData.deliveryAddress,
        additionalInstruction: formData.additionalInstructions,
        deliveryDate: formData.orderDate,
      };

      const response = await axiosInstance.post('/api/feast/orders', orderData);

      if (response.status === 201) {
        alert("Order placed successfully!");
        setSelectedItems([]);
        setSelectedBeansType("");
        setSelectedDesserts([]);
        navigate("/showitems");
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <>
      <Navbar className="sticky-navbar" />
      <div className="container mt-4">
        <div className="row">
          <h2 style={{ marginBottom: '24px' }}>Customize Your Feast</h2>
          <div className="col-md-8">
            <ItemsGrid
              title="Basic Compulsory Items"
              items={compulsoryItems}
              selectedBeansType={selectedBeansType}
              onBeansSelection={handleBeansSelection}
            />
            <hr className="my-4" />
            <ItemsGrid
              title="Additional Items"
              items={additionalItems}
              selectedItems={selectedItems}
              onToggle={handleItemToggle}
            />
            <ItemsGrid
              title="Desserts"
              items={dessertItems}
              selectedItems={selectedDesserts}
              onToggle={handleDessertSelection}
            />
          </div>
          <div className="col-md-4">
            <div className="position-sticky" style={{ top: '12rem' }}>
              <PriceSummaryCard
                basePricePerPlate={basePricePerPlate}
                additionalCost={additionalCost}
                totalPrice={totalPrice}
                onOpenDialog={() => setIsDialogOpen(true)}
                selectedItems={selectedItems}
                selectedDesserts={selectedDesserts}
                itemsData={itemsData}
              />
            </div>
          </div>
        </div>
      </div>
      <OrderConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmOrder}
      />
    </>
  );
};

export default ViewItems;