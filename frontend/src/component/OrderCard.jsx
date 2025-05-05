import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export default function OrderCard({ item }) {
    const [deliveryCost, setDeliveryCost] = useState(null);
    const { axiosInstance } = useAuth();
    const navigate = useNavigate();

    // fetching delivery cost
    useEffect(() => {
        const getCost = async () => {
            try {
                const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/order/getDeliveryCost`)
                setDeliveryCost(response.data)
            }
            catch (err) {
                toast.error("Error retriving delivery cost", err?.message)
            }
        }
        getCost()
    }, [axiosInstance])

    // cancel order behavior 
    const handleCancelOrder = async (orderId) => {
        try {
            await axiosInstance.post('/api/order/cancelOrder', { orderId })
            navigate(0) 
            toast.success("Order Canceled successfully")
        }
        catch (error) { 
            toast.error("Error cancelling order", error?.message)
        }
    }

    return (
        <>
            <div className="p-4 border rounded-md " style={{ margin: '1rem 6rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', borderRadius: '1rem' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <p className="px-3 py-2" style={{ backgroundColor: '#DC3545', padding: '4px 12px', borderRadius: '6px', color: 'white' }}>Order ID: {item._id}</p>
                    <p className="px-3 py-2" style={{
                        backgroundColor:
                            item.orderStatus === 'pending' ? '#FFA500' :
                                item.orderStatus === 'inprogress' ? '#007BFF' :
                                    item.orderStatus === 'in delivery' ? '#17a2b8' :
                                        item.orderStatus === 'completed' ? '#28a745' :
                                            item.orderStaenutus === 'canceled' ? '#dc3545' :
                                                '#6c757d',
                        color: 'white',
                        borderRadius: '6px'
                    }}>
                        {item.orderStatus}
                    </p>
                </div>
                {item?.items?.map((foodItem, index) => (
                    <div key={index} className="row g-0 m-2">
                        <div className="col-12 col-md-4" style={{ height: "150px", overflow: "hidden" }}>
                            <img
                                src={`${import.meta.env.VITE_BACKEND_BASE_URL}${foodItem.menuItem.imgUrl}`}
                                className="img-fluid rounded-start"
                                alt={item.name}
                                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div className="col-12 col-md-8 p-2">
                            <div className="card-body">
                                <h5 className="card-title">{foodItem.menuItem.name} ({foodItem.selectedType.name})</h5>
                                <p className="card-text">Price: Rs {foodItem.selectedType.price}</p>
                                <p className="card-text">Quantity: {foodItem.quantity}</p>
                                <p className="card-text">Total: Rs {foodItem.selectedType.price * foodItem.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="p-4 d-flex justify-content-between">
                    <div>
                        <h5> Total: Rs. {item.total}</h5>
                        <h5> Delivery Cost: Rs. {deliveryCost}</h5>
                        <hr />
                        <h4> Grand Total: {deliveryCost + item.total}</h4>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div>
                            <button className="btn btn-danger py-2 px-4" onClick={() => handleCancelOrder(item._id)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}