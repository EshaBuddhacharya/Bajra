import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
// import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner';
import OrderCard from "../component/OrderCard"

const OrderPage = () => {
  const { axiosInstance } = useAuth()
  const [userOrders, setUserOrders] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/order/getOrders");
        if (isMounted) {
          setUserOrders(response.data);
          setIsLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching orders:", error);
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

  const renderOrders = () => {
    const filteredOrders = userOrders?.filter(item => item.orderStatus !== 'canceled');
    if (!filteredOrders?.length) {
      return (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <h1>No orders yet</h1>
        </div>
      );
    }

    return filteredOrders
      .map((item, index) => (
      <OrderCard key={item.id || index} item={item} />
      ));
  };

  return (
    <div>
      <Navbar className="sticky" />
      <div className="d-flex flex-column" style={{ minHeight: '65vh' }}>
        {isLoading ? renderSpinner() : renderOrders()}
      </div>
    </div>
  );
};

export default OrderPage;
