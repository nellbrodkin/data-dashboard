import { useEffect, useState } from "react";
import Chart from "../components/Chart";
import Table from "../components/Table";

function Home({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [filterPrice, setFilterPrice] = useState(0);
  const [changeFilter, setChangeFilter] = useState("all"); // State to hold the selected change filter

  useEffect(() => {
    // Calculate total number of items
    setTotalItems(data.length);

    // Calculate average price
    const totalPrices = data.reduce((acc, item) => acc + parseFloat(item.priceUsd), 0);
    const avgPrice = totalPrices / data.length;
    setAveragePrice(avgPrice);

    // Find highest price
    const highest = data.reduce((max, item) => (parseFloat(item.priceUsd) > max ? parseFloat(item.priceUsd) : max), 0);
    setHighestPrice(highest);

    // initialize filter price
    setFilterPrice(highest);
  }, [data]);

  useEffect(() => {
    // Filter users based on search term, price, and change filter
    const filtered = data.filter(item =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
      parseFloat(item.priceUsd) <= filterPrice &&
      (changeFilter === "all" ||
        (changeFilter === "positive" && parseFloat(item.changePercent24Hr) >= 0) ||
        (changeFilter === "negative" && parseFloat(item.changePercent24Hr) < 0))
    );
    setFilteredItems(filtered);
  }, [searchTerm, data, filterPrice, changeFilter]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handlePriceChange = event => {
    setFilterPrice(parseFloat(event.target.value));
  };

  const handleSign = event => {
    setChangeFilter(event.target.value);
  };

  return (
    <div className="Home">
      <h1>Crypto Dashboard</h1>

      <div>
        <h2>Summary Statistics</h2>
        <p>Total Items: {totalItems}</p>
        <p>Average Price (USD): ${averagePrice.toFixed(2)}</p>
        <p>Highest Price (USD): ${highestPrice.toFixed(2)}</p>
      </div>

      <div className="filters">
        <div className="searchcontainer">
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="search name or symbol" />
          <button onClick={() => setSearchTerm("")}>Clear</button>
        </div>
        <div className="slidercontainer">
          <label htmlFor="priceRange">Only display prices below: ${filterPrice}</label>
          <input type="range" min="0" max={highestPrice} value={filterPrice} onChange={handlePriceChange} id="priceRange" />
        </div>
        <div className="signchoicecontainer">
          <label>Change percent:</label>
          <input type="radio" id="positive" name="sign" value="positive" checked={changeFilter === "positive"} onChange={handleSign} />
          <label htmlFor="positive"> Positive</label>
          <input type="radio" id="negative" name="sign" value="negative" checked={changeFilter === "negative"} onChange={handleSign} />
          <label htmlFor="negative"> Negative</label>
          <input type="radio" id="all" name="sign" value="all" checked={changeFilter === "all"} onChange={handleSign} />
          <label htmlFor="all"> All</label>
        </div>
      </div>

      <Table filteredItems={filteredItems} />
      <Chart data={data} />
    </div>


  );
}

export default Home;
