import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
// import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner';

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
          console.log("User orders fetched:", response.data);
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


  return (
    <div>
      <Navbar className="sticky" />
      <div style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column' }}>
        {isLoading ?
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></div> :
          userOrders && userOrders.map(item => (
            <div key={item._id} className="p-4 border rounded-md" style={{ margin: '2rem 5rem', borderRadius: '1rem' }}>
              <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ backgroundColor: '#DC3545', padding: '4px 12px', borderRadius: '6px', color: 'white' }}>Order ID: {item._id}</p>
                <p style={{
                  backgroundColor:
                    item.orderStatus === 'pending' ? '#FFA500' :
                      item.orderStatus === 'inprogress' ? '#007BFF' :
                        item.orderStatus === 'in delivery' ? '#17a2b8' :
                          item.orderStatus === 'completed' ? '#28a745' :
                            item.orderStatus === 'canceled' ? '#dc3545' :
                              '#6c757d',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '6px'
                }}>
                  {item.orderStatus}
                </p>
              </div>
              {item.items.map(foodItem => (
                <div className="row g-0 m-2">
                  <div className="col-md-4" style={{ height: "150px", overflow: "hidden" }}>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_BASE_URL}${foodItem.menuItem.imgUrl}`}
                      className="img-fluid rounded-start"
                      alt={item.name}
                      style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8 p-2">
                    <div className="card-body">
                      <h5 className="card-title">{foodItem.menuItem.name} ({foodItem.selectedType.name})</h5>
                      <p className="card-text">Price: Rs {foodItem.selectedType.price}</p>
                      <p className="card-text">Quantity: {foodItem.quantity}</p>
                      <p className="card-text">Total: Rs {foodItem.selectedType.price * foodItem.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderPage;
