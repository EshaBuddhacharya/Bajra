import { Box, Card, Flex, Text, Heading, Avatar, Button } from '@radix-ui/themes';
import { ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '../context'; // Adjust the import path as necessary
import { motion } from 'framer-motion'
import { Skeleton } from '@radix-ui/themes';

export default function RecentOrderCard({ title }) {
    const { recentOrder, isDashboardDataLoading } = useDashboardContext();

    return (
        <Box
            style={{
                background: '#FAF9FB',
                borderRadius: '16px'
            }}
            px={{ initial: '2', sm: '5' }}
            py='5'
            height='100%'
            flexGrow='1'
            width={{ initial: '100%', sm: 'auto' }}
        >
            <Flex direction='column' gap='4'>
                <Flex align='center' gap='4'>
                    <ShoppingBasket size='25' />
                    <Text size='7' weight='semibold'>{title}</Text>
                </Flex>
                <Flex gap='4' direction='column' minHeight='12.5rem'>
                    {isDashboardDataLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <UserCardSkeleton key={index} />
                        ))
                    ) : recentOrder.length === 0 ? (
                        <Text size='3' color='gray'>No recent orders</Text>
                    ) : (
                        recentOrder.map((order, index) => (
                            <UserCard
                                key={order._id}
                                order={order}
                                index={index}
                            />
                        ))
                    )}
                </Flex>
                <Link to='/admin/orders' style={{ textDecoration: 'none' }}>
                    <Button variant='soft' size='2' style={{ width: '100%' }}>
                        View More
                    </Button>
                </Link>
            </Flex>
        </Box>
    );
}

const UserCard = ({ order, index }) => {
    const { handleViewRecentOrderDetails } = useDashboardContext();

    return (
        <motion.div
            className=''
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.3 } }}
        >
            <Flex align='center' justify='between' py='2'>
                <Flex align='center' gap={{ initial: '1', sm: '3' }}>
                    <Avatar
                        size='3'
                        src={order.user.imageUrl}
                        fallback={order.user.name[0]}
                        radius='full'
                    />
                    <Flex direction='column'>
                        <Text size='2' weight='bold'>{order.user.name}</Text>
                        <Text size='2' color='gray'>{order.user.email}</Text>
                    </Flex>
                </Flex>
                <Button variant='ghost' size='1' onClick={() => handleViewRecentOrderDetails(order)}>
                    View Details
                </Button>
            </Flex>
        </motion.div>
    )
}

const UserCardSkeleton = () => {
    return (
        <motion.div
            className=''
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Flex align='center' justify='between' py='2'>
                <Flex align='center' gap={{ initial: '1', sm: '3' }}>
                    <Skeleton style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <Flex direction='column' gap='1'>
                        <Skeleton style={{ width: '100px', height: '20px' }} />
                        <Skeleton style={{ width: '150px', height: '20px' }} />
                    </Flex>
                </Flex>
                <Skeleton style={{ width: '80px', height: '25px', borderRadius: '4px' }} />
            </Flex>
        </motion.div>
    );
}