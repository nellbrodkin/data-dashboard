import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Details from "./pages/Details";


export default function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://api.coincap.io/v2/assets");
            const jsonData = await response.json();
            setData(jsonData.data);
        };
        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home data={data} />} />
                    <Route path="details/:id" element={<Details data={data} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
