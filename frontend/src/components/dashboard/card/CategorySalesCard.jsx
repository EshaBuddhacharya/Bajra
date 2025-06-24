import { Card, Box, Text, Heading, Flex } from '@radix-ui/themes';
import { ChartPie } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Veg',
        sales: 4000,
    },
    {
        name: 'Non-Veg',
        sales: 3500,
    },
    {
        name: 'Drinks',
        sales: 2800,
    },
    {
        name: 'Desserts',
        sales: 2000,
    },
    {
        name: 'Special Feast',
        sales: 3200,
    },
];

export default function CategorySalesCard({ title }) {
    return (
        <Box
            flexGrow='1'
            p='4'
            width={{ initial: '100%', sm: 'auto' }}
            style={{ background: '#F1F6FC', borderRadius: '16px', color: "#102542" }}
        >
            <Flex p='2' gap='0' direction={{ initial: 'column', sm: 'row' }} align='center' justify='between'>
                <Flex direction='column' align='start' justify='center' gap='2'>
                    <ChartPie size='34' />
                    <h2 className="text-lg">{title}</h2>
                </Flex>
                <Box style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="sales" fill="#102542" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Flex>
        </Box>
    );
}
