import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../../component/admin/users/SearchBar';
import UsersTable from '../../component/admin/users/UsersTable';
import { ShoppingBag, UserIcon } from 'lucide-react';

export default function Users() {
    const { axiosInstance } = useAuth();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [sortBy, setSortBy] = useState('')
    const [isAscending, setIsAscending] = useState(false)
    const { setUser: setCurrentUser, user: currentUser } = useAuth()

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axiosInstance.get("/api/auth/isAuthenticated")
            setCurrentUser(response.data?.user)
        }
        fetchUser()
    }, [axiosInstance, setCurrentUser])

    const toggleOrder = () => {
        setIsAscending(!isAscending)
    }

    // fetching users
    useEffect(() => {
        async function fetchUsers() {
            try {
                setIsUsersLoading(true);
                const { data } = await axiosInstance.get('/api/users/getAllUsers');
                setUsers(data);
                setIsUsersLoading(false);
            } catch (err) {
                toast.error('Error fetching users', err.message);
            }
        }
        fetchUsers();
    }, [axiosInstance]);

    const handleDelete = (id) => {
        axiosInstance
            .delete(`/api/users/deleteUser/${id}`)
            .then(() => setUsers((prev) => prev.filter((u) => u._id !== id)))
            .catch((err) => toast.error('Error deleting user', err.message));
    };

    const filteredUsers = users.filter((u) => {
        const searchTerm = search.trim().toLowerCase();
        const searchMatch =
            u.name.toLowerCase().includes(searchTerm) ||
            u.phone.toLowerCase().includes(searchTerm) ||
            u.address.toLowerCase().includes(searchTerm) ||
            u.role.toLowerCase().includes(searchTerm) ||
            u._id.toLowerCase().includes(searchTerm);

        return searchMatch;
    }).sort((a, b) => {
        if (!sortBy) return 0;

        let comparison = 0;
        switch (sortBy) {
            case 'date':
                comparison = new Date(b.createdAt) - new Date(a.createdAt);
                break;
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'phone':
                comparison = a.phone.localeCompare(b.phone);
                break;
            case 'address':
                comparison = a.address.localeCompare(b.address);
                break;
            case 'role':
                comparison = a.role.localeCompare(b.role);
                break;
            default:
                return 0;
        }
        return isAscending ? comparison : -comparison;
    });

    return (
        <div className="p-5" style={{ flexGrow: 1 }}>
            <h2 className='d-flex align-items-center gap-2'>
                <UserIcon fontWeight={400} size={30} />
                User Management
            </h2>
            <div className="my-4 d-flex gap-2 align-items-center">
                <SearchBar search={search} onSearchChange={setSearch} />
            </div>
            <UsersTable
                users={filteredUsers}
                onDelete={handleDelete}
                isLoading={isUsersLoading}
                toggleOrder={toggleOrder}
                setSortBy={setSortBy}
                isAscending={isAscending}
                sortBy={sortBy}
                currentUser={currentUser}
            />
        </div>
    );
}
