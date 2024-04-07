import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
    return (
        <>
            <h2>Chart</h2>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priceUsd" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="maxSupply" stroke="#8884d8" />
            </LineChart>
        </>
    );
};

export default Chart;