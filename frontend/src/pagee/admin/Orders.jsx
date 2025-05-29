import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../../component/admin/orders/SearchBar';
import FilterDropdown from '../../component/admin/orders/FilterDropDown';
import OrdersTable from '../../component/admin/orders/OrdersTable';
import { ShoppingBag } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Box } from '@radix-ui/themes';
import DetailsDialog from '../../component/admin/orders/DetailsDialog';

export default function Orders() {
  const { axiosInstance } = useAuth();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isAscending, setIsAscending] = useState(false)
  const [isDetailsDialogOpen, setDetailsDialogOpen]= useState(false)
  const [selectedOrderDetails, setSelectedOrderDetails] = useState()

  const toggleOrder = () => {
    setIsAscending(!isAscending)
  }
  // fetching orders
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
  }).sort((a, b) => {
    if (!sortBy) return 0;

    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(b.createdAt) - new Date(a.createdAt);
        break;
      case 'name':
        comparison = a.user.name.localeCompare(b.user.name);
        break;
      case 'phone':
        comparison = a.user.phone.localeCompare(b.user.phone);
        break;
      case 'location':
        comparison = a.deliveryLocation.localeCompare(b.deliveryLocation);
        break;
      case 'status':
        comparison = a.orderStatus.localeCompare(b.orderStatus);
        break;
      case 'type':
        comparison = a.items[0]?.selectedType.name.localeCompare(b.items[0]?.selectedType.name) || 0;
        break;
      case 'total':
        comparison = b.total - a.total;
        break;
      default:
        return 0;
    }
    return isAscending ? comparison : -comparison;
  });

  return (
    <Box p='9' pr={{initial: '3', md: '8'}} style={{ flexGrow: 1 }}>
      <h2 className='d-flex align-items-center gap-2'>
        <ShoppingBag fontWeight={400} size={30} />
        Order Management
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
          setDetailsDialogOpen={setDetailsDialogOpen}
          setSelectedOrderDetails={setSelectedOrderDetails}
        />
      </AnimatePresence>
      <DetailsDialog 
        isDetailsDialogOpen={isDetailsDialogOpen} 
        setDetailsDialogOpen={setDetailsDialogOpen}
        selectedOrderDetails={selectedOrderDetails}
       />
    </Box>
  );
}
