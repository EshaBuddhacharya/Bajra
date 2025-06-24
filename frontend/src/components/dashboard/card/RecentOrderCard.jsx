import { Box, Card, Flex, Text, Heading, Avatar, Button } from '@radix-ui/themes';
import { ShoppingBasket } from 'lucide-react';

export default function RecentOrderCard({ title }) {
    // Dummy data for users
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    ];

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

                {users.map((user) => (
                    <Flex key={user.id} align='center' justify='between' py='2'>
                        <Flex align='center' gap={{ initial: '1', sm: '3' }}>
                            <Avatar
                                size='3'
                                src={user.avatar}
                                fallback={user.name[0]}
                                radius='full'
                            />
                            <Flex direction='column'>
                                <Text size='2' weight='bold'>{user.name}</Text>
                                <Text size='2' color='gray'>{user.email}</Text>
                            </Flex>
                        </Flex>
                        <Button variant='ghost' size='1' >
                            View Details
                        </Button>
                    </Flex>
                ))}

                <Button variant='soft' size='2'>
                    View More
                </Button>
            </Flex>
        </Box>
    );
}