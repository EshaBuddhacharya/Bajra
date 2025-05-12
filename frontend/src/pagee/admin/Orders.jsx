import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../../component/admin/orders/SearchBar';
import FilterDropdown from '../../component/admin/orders/FilterDropDown';
import OrdersTable from '../../component/admin/orders/OrdersTable';
import { ShoppingBag } from 'lucide-react';

export default function Orders() {
  const { axiosInstance } = useAuth();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsOrdersLoading(true);
        const { data } = await axiosInstance.get('/api/order/getAllOrders');
        setOrders(data);
        setIsOrdersLoading(false);
      } catch (err) {
        toast.error('Error fetching orders', err.message);
      }
    }
    fetchOrders();
  }, [axiosInstance]);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/order/deleteOrder/${id}`)
      .then(() => setOrders((prev) => prev.filter((o) => o._id !== id)))
      .catch((err) => toast.error('Error deleting order', err.message));
  };

  const filteredOrders = orders.filter((o) => {
    const searchTerm = search.trim().toLowerCase();
    const searchMatch = 
      o.user.name.toLowerCase().includes(searchTerm) ||
      o.user.phone.toLowerCase().includes(searchTerm) ||
      o.deliveryLocation.toLowerCase().includes(searchTerm) ||
      o.orderStatus.toLowerCase().includes(searchTerm) ||
      o._id.toLowerCase().includes(searchTerm) ||
      o.items.some(item =>
      item.selectedType.name.toLowerCase().includes(searchTerm)
      );
    
    return searchMatch && (!selectedStatus || o.orderStatus === selectedStatus);
  });

  return (
    <div className="p-5" style={{ flexGrow: 1 }}>
      <h2 className='d-flex align-items-center gap-2'>
        <ShoppingBag fontWeight={400} size={30}/>
        Order Management
      </h2>
      <div className="my-4 d-flex gap-2 align-items-center">
        <SearchBar search={search} onSearchChange={setSearch} />
        <FilterDropdown setSelectedStatus={setSelectedStatus} />
      </div>
      <OrdersTable orders={filteredOrders} onDelete={handleDelete} isLoading={isOrdersLoading}/>
    </div>
  );
}
