import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../../component/admin/FeastOrders/SearchBar';
import FilterDropdown from '../../component/admin/FeastOrders/FilterDropDown';
import OrdersTable from '../../component/admin/FeastOrders/FeastTable';
import { ShoppingBag, Ham } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Box } from '@radix-ui/themes';

export default function Orders() {
  const { axiosInstance } = useAuth();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isAscending, setIsAscending] = useState(false)

  const toggleOrder = () => {
    setIsAscending(!isAscending)
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsOrdersLoading(true);
        const { data } = await axiosInstance.get('/api/feast/orders');
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
      .delete(`/api/feast/orders/${id}`)
      .then(() => setOrders((prev) => prev.filter((o) => o._id !== id)))
      .catch((err) => toast.error('Error deleting order', err.message));
  };

  const filteredOrders = orders.filter((o) => {
    const searchTerm = search.trim().toLowerCase();
    const searchMatch =
      o.user?.name?.toLowerCase().includes(searchTerm) ||
      o._id.toLowerCase().includes(searchTerm) ||
      o.status?.toLowerCase().includes(searchTerm) ||
      o.compulsoryItems.some(item => 
        item.item.name.toLowerCase().includes(searchTerm) ||
        item.selectedSubType?.toLowerCase().includes(searchTerm)
      );

    return searchMatch && (!selectedStatus || o.status === selectedStatus);
  }).sort((a, b) => {
    if (!sortBy) return 0;

    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(b.orderDate) - new Date(a.orderDate);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'total':
        comparison = b.totalPrice - a.totalPrice;
        break;
      default:
        return 0;
    }
    return isAscending ? comparison : -comparison;
  });

  return (
    <Box p='7' px='9' pr={{initial: '3', md: '8'}} style={{ flexGrow: 1 }}>
      <h2 className='d-flex align-items-center gap-2'>
        <Ham fontWeight={400} size={30} />
        Feast Order Management
      </h2>
      <div className="my-4 d-flex gap-2 align-items-center">
        <SearchBar search={search} onSearchChange={setSearch} placeholder="Search the orders..."/>
        <FilterDropdown setSelectedStatus={setSelectedStatus} />
      </div>
      <AnimatePresence mode='wait'>
        <OrdersTable
          orders={filteredOrders}
          onDelete={handleDelete}
          isLoading={isOrdersLoading}
          toggleOrder={toggleOrder}
          setSortBy={setSortBy}
        />
      </AnimatePresence>
    </Box>
  );
}
