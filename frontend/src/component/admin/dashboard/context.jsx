import { useContext, createContext, useEffect, useState } from "react";
import { useAuth } from '../../../contexts/AuthContext'

const DashboardContext = createContext();

export const useDashboardContext = () => {
    return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
    const [salesData, setSalesData] = useState({
        total: 0,
        dailySales: 0,
        salesByCategory: [
            {
                category: "Nonveg",
                sales: 0
            },
            {
                category: "Desserts",
                sales: 0
            },
            {
                category: "Veg",
                sales: 0
            },
            {
                category: "Drinks",
                sales: 0
            }
        ],
        monthlySales: [
            { month: 'Jan', sales: 0 },
            { month: 'Feb', sales: 0 },
            { month: 'Mar', sales: 0 },
            { month: 'Apr', sales: 0 },
            { month: 'May', sales: 0 },
            { month: 'Jun', sales: 0 },
            { month: 'Jul', sales: 0 },
            { month: 'Aug', sales: 0 },
            { month: 'Sep', sales: 0 },
            { month: 'Oct', sales: 0 },
            { month: 'Nov', sales: 0 },
            { month: 'Dec', sales: 0 }
        ]
    });
    const [recentOrder, setRecentOrder] = useState([]);
    const [isViewRecentOrderDetails, setIsViewRecentOrderDetails] = useState(false);
    const [selectedRecentOrder, setSelectedRecentOrder] = useState(null);
    const { axiosInstance } = useAuth();

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await Promise.all([
                    axiosInstance.get('/api/order/getSalesData'),
                    axiosInstance.get('/api/order/getRecentOrders')
                ]);
                setSalesData(response[0].data);
                setRecentOrder(response[1].data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, [axiosInstance]);

    // handle view recent order details
    const handleViewRecentOrderDetails = (order) => {
        setSelectedRecentOrder(order);
        setIsViewRecentOrderDetails(true);
    }

    const value = {
        salesData,
        setSalesData,
        recentOrder,
        isViewRecentOrderDetails,
        selectedRecentOrder,
        handleViewRecentOrderDetails, 
        setIsViewRecentOrderDetails,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};