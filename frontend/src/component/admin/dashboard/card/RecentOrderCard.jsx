import { Box, Card, Flex, Text, Heading, Avatar, Button } from '@radix-ui/themes';
import { ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '../context'; // Adjust the import path as necessary

export default function RecentOrderCard({ title }) {
    const { recentOrder, handleViewRecentOrderDetails } = useDashboardContext();

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
                    {recentOrder.map((order) => (
                        <Flex key={order._id} align='center' justify='between' py='2'>
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
                    ))}
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