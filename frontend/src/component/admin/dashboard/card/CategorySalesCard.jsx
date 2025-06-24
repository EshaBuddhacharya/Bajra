import { Card, Box, Text, Heading, Flex } from '@radix-ui/themes';
import { ChartPie } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useDashboardContext } from '../context';


export default function CategorySalesCard({ title }) {
    const { salesData } = useDashboardContext();
    const data = salesData.salesByCategory; 
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
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Bar dataKey="sales" fill="#102542" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Flex>
        </Box>
    );
}
