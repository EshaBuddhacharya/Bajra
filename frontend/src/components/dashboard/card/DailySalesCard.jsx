import { Card, Box, Text, Heading, Flex } from '@radix-ui/themes';
import { BadgeIndianRupee } from 'lucide-react';

export default function DailySales({ title, value }) {
    return (
        <Flex
            width={{ initial: '100%', sm: "15rem" }}
            style={{ background: '#FDF9F0', borderRadius: '16px', color: "#F4A200" }}
            p='5'
            align='center'
            gap='4'
        >   
            <BadgeIndianRupee size='50' />
            <Box>
                <Flex direction={'column'} align='start'>
                    <Text style={{color: "#A6A6A6"}}>{title}</Text>
                    <Heading size='6' style={{color: "#132643"}}>{value}</Heading>
                </Flex>
            </Box>
        </Flex>
    );
}