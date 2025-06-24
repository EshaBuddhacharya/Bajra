import { Flex } from "@radix-ui/themes"
import TotalSales from "../../component/admin/dashboard/card/TotalSalesCard"
import { BadgeDollarSign, LayoutDashboard } from 'lucide-react'
import MonthlySalesCard from "../../component/admin/dashboard/card/MonthlySalesCard"
import CategorySalesCard from "../../component/admin/dashboard/card/CategorySalesCard"
import RecentOrderCard from "../../component/admin/dashboard/card/RecentOrderCard"
import DailySales from "../../component/admin/dashboard/card/DailySalesCard"
import { DashboardProvider } from "../../component/admin/dashboard/context"
import DetailsDialog from "../../component/admin/dashboard/dialog/DetailsDialog"

export function Dashboard() {
    return (
        <>
            <Flex p={{ initial: "4", sm: "8" }} minHeight='100vh' gap='4' direction='column'>
                <Flex align='center' gap='3'>
                    <LayoutDashboard size='30' />
                    <h1 style={{ margin: 0 }}> Dashboard </h1>
                </Flex>
                <Flex
                    pt='4'
                    align={'center'}
                    gap='4'
                    direction={{ initial: 'column', md: 'row' }}
                    justify='between'
                    width={{ initial: '100%', sm: 'auto' }}
                >
                    <Flex direction='column' gap='3' width={{ initial: '100%', sm: 'auto' }}>
                        <TotalSales title="Total Sales" value="Rs. 10,000" icon={<BadgeDollarSign />} />
                        <DailySales title="Daily Sales" value="Rs. 10,000" icon={<BadgeDollarSign />} />
                    </Flex>
                    <CategorySalesCard title="Category Sales" value="Rs. 5,000" />
                </Flex>
                <Flex
                    width={{ initial: '100%', sm: 'auto' }}
                    align={'center'}
                    height={'100%'}
                    gap='4'
                    direction={{ initial: 'column', md: 'row' }}
                    justify='between'
                >
                    <MonthlySalesCard title="Monthly Sales" value="Rs. 2,000" />
                    <RecentOrderCard title="Recent Orders" value="15" />
                </Flex>
            </Flex>
            <DetailsDialog />
        </>
    )
}

export default function DashboardLayout() {
    return (
        <DashboardProvider>
            <Dashboard />
        </DashboardProvider>
    )
}