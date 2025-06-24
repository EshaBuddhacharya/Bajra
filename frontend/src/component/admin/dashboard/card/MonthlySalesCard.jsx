import { Box, Card, Text, Heading, Flex } from '@radix-ui/themes';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarClock } from 'lucide-react';
import { useDashboardContext } from '../context';

export default function MonthlySalesCard({ title }) {
    const { salesData } = useDashboardContext();
    const monthlySalesData = salesData.monthlySales

    return (
        <Box
            width={{ initial: "100%", sm: "60%" }}
            style={{
                background: '#FDF1F1',
                borderRadius: '16px',
                color: "#D72638"
            }}
            px='5'
            py='5'
        >
            <Flex direction='column' gap='4'>
                <Flex gap='3' align='center'>
                    <CalendarClock size="30" />
                    <h3 style={{margin: '0px'}}>{title}</h3>
                </Flex>
                <Box height="250px">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <Area type="monotone" dataKey="sales" stroke="#DC3545" fill="#DC3545" fillOpacity={0.3} />
                            <XAxis dataKey="month" color='#D72638' />
                            <Tooltip />
                            <CartesianGrid vertical={false} opacity={0.2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Flex>
        </Box>
    );
}