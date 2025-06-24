import { Box, Card, Text, Heading, Flex } from '@radix-ui/themes';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlySalesCard({ title }) {
    // Dummy monthly sales data
    const monthlySalesData = [
        { month: 'Jan', sales: 4000 },
        { month: 'Feb', sales: 3000 },
        { month: 'Mar', sales: 5000 },
        { month: 'Apr', sales: 2780 },
        { month: 'May', sales: 1890 },
        { month: 'Jun', sales: 2390 },
        { month: 'Jul', sales: 3490 },
        { month: 'Aug', sales: 4000 },
        { month: 'Sep', sales: 3200 },
        { month: 'Oct', sales: 2800 },
        { month: 'Nov', sales: 4300 },
        { month: 'Dec', sales: 5000 },
    ];

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
                <h3>{title}</h3>
                <Box height="250px">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <Area type="monotone" dataKey="sales" stroke="#DC3545" fill="#DC3545" fillOpacity={0.3} />
                            <XAxis dataKey="month" color='#D72638'/>
                            <Tooltip />
                            <CartesianGrid vertical={false}  opacity={0.2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Flex>
        </Box>
    );
}