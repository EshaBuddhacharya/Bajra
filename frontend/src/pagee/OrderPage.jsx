import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useAuth } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner';
import OrderCard from "../component/OrderCard"

const OrderPage = () => {
  const { axiosInstance } = useAuth()
  const [userOrders, setUserOrders] = useState(null)
  const [feastOrders, setFeastOrders] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    let isMounted = true;
    
    const fetchOrders = async () => {
      try {
        const [regularOrders, feastOrdersResponse] = await Promise.all([
          axiosInstance.get("/api/order/getOrders"),
          axiosInstance.get("/api/feast/orders/getUserOrders")
        ]);
        
        if (isMounted) {
          setUserOrders(regularOrders.data);
          setFeastOrders(feastOrdersResponse.data);
          setIsLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching orders:", error);
          setIsLoading(false);
        }
      }
    };
    
    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [axiosInstance])

  const renderSpinner = () => (
    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'primary';
      case 'preparing':
        return 'info';
      case 'ready':
        return 'success';
      case 'delivered':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const renderRegularOrders = () => {
    const filteredOrders = userOrders?.filter(item => item.orderStatus !== 'canceled') || [];

    if (!filteredOrders.length) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <h3>No regular orders</h3>
        </div>
      );
    }

    return filteredOrders.map((item, index) => (
      <OrderCard key={item._id || index} item={item} />
    ));
  };

  const renderFeastOrders = () => {
    const filteredOrders = feastOrders?.filter(item => item.status !== 'canceled') || [];

    if (!filteredOrders.length) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <h3>No feast package orders</h3>
        </div>
      );
    }

    return filteredOrders.map((item, index) => (
      <div key={item._id || index} className="card mx-5 my-4 p-4 shadow-lg border-0 rounded-3">
        <h4 className="mb-3" style={{ color: '#ff6b6b' }}>Special Feast Package Order</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="card-body bg-light p-3 rounded-3 mb-3">
              <p className="mb-2"><strong>Order Status:</strong> <span className={`badge bg-${getStatusColor(item.status)}`}>{item.status}</span></p>
              <p className="mb-2"><strong>People Count:</strong> {item.peopleCount}</p>
              <p className="mb-2"><strong>Base Price Per Plate:</strong> Rs. {item.basePricePerPlate}</p>
              <p className="mb-2"><strong>Delivery Charge:</strong> Rs. {item.deliveryCharge}</p>
              <p className="mb-2"><strong>Total Price:</strong> <span className="text-success">Rs. {item.totalPrice}</span></p>
              <p className="mb-0"><strong>Order Date:</strong> {new Date(item.orderDate).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card-body bg-light p-3 rounded-3">
              <div className="mb-3">
                <h5 className="text-secondary">Compulsory Items:</h5>
                {item.compulsoryItems.map((compItem, i) => (
                  <div key={i} className="ps-3">{compItem.item.name}</div>
                ))}
              </div>

              {item.additionalItems.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-secondary">Additional Items:</h5>
                  {item.additionalItems.map((addItem, i) => (
                    <div key={i} className="ps-3">
                      {addItem.item.name} - <span className="text-success">Rs. {addItem.pricePerPerson}/person</span>
                    </div>
                  ))}
                </div>
              )}

              {item.desserts.length > 0 && (
                <div>
                  <h5 className="text-secondary">Desserts:</h5>
                  {item.desserts.map((dessert, i) => (
                    <div key={i} className="ps-3">
                      {dessert.item.name} - <span className="text-success">Rs. {dessert.pricePerPerson}/person</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Navbar className="sticky" />
      <div className="d-flex flex-column" style={{ minHeight: '65vh' }}>
        {isLoading ? renderSpinner() : (
          <>
            <div className="regular-orders">
              <h2 className="text-center mt-3">Regular Orders</h2>
              {renderRegularOrders()}
            </div>
            <div className="feast-orders">
              <h2 className="text-center mt-4">Feast Package Orders</h2>
              {renderFeastOrders()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
