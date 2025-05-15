import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import MenuHeader from '../../component/admin/menu/MenuHeader';
import MenuControls from '../../component/admin/menu/MenuControls';
import MenuCards from '../../component/admin/menu/MenuCards';

export default function AdminMenu() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [menuData, setMenuData] = useState();
    const { axiosInstance } = useAuth();

    const { data, isLoading: isMenuLoading } = useQuery({
        queryKey: ['menuItems'],
        queryFn: () =>
            axios
                .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/menu/getItems`)
                .then(response => {
                    setMenuData(response.data);
                    return response.data;
                })
    });

    const { data: categoryData, isLoading: isCategoryLoading, error: categoryError } = useQuery({
        queryKey: ['menuCategories'],
        queryFn: () =>
            axios
                .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/menu/getCategories`)
                .then(response => response.data)
    });

    const filteredData = menuData?.filter(item => {
        if (selectedCategory.toLowerCase() === 'all') {
            return true;
        }
        return selectedCategory.toLowerCase() === item.category.toLowerCase();
    });

    const handleDelete = (id) => {
        axiosInstance
            .delete(`/api/menu/deleteItem/${id}`)
            .then(() => setMenuData((prev) => prev.filter((o) => o._id !== id)))
            .catch((err) => toast.error('Error deleting order', err.message));
    };

    const handleEdit = (updatedItem) => {
        setMenuData((prev) =>
            prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
    };

    return (
        <div className="p-5 flex-grow-1">
            <MenuHeader />
            <MenuControls
                categoryData={categoryData}
                isCategoryLoading={isCategoryLoading}
                categoryError={categoryError}
                setSelectedCategory={setSelectedCategory}
            />
            <MenuCards
                filteredData={filteredData}
                isLoading={isMenuLoading}
                handleDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}