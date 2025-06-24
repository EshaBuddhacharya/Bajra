import { Card, Box, Text, Heading, Flex } from '@radix-ui/themes';
import { TrendingUp } from 'lucide-react';

export default function TotalSales({ title, value }) {
    return (
        <Flex
            width={{ initial: '100%', sm: "15rem" }}
            style={{ background: '#F2FDF7', borderRadius: '16px', color: "#16A34A" }}
            p='5'
            align='center'
            gap='4'
        >
            <TrendingUp size='50'/>
            <Box>
                <Flex direction={'column'} align='start'>
                    <Text style={{color: "#A6A6A6"}}>{title}</Text>
                    <Heading size='6' style={{color: "#132643"}}>{value}</Heading>
                </Flex>
            </Box>
        </Flex>
    );
}