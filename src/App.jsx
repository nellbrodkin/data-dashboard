import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("http://api.coincap.io/v2/assets");
      const jsonData = await response.json();
      setUsers(jsonData.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total number of items
    setTotalItems(users.length);

    // Calculate average price
    const totalPrices = users.reduce((acc, user) => acc + parseFloat(user.priceUsd), 0);
    const avgPrice = totalPrices / users.length;
    setAveragePrice(avgPrice);

    // Find highest price
    const highest = users.reduce((max, user) => (parseFloat(user.priceUsd) > max ? parseFloat(user.priceUsd) : max), 0);
    setHighestPrice(highest);
  }, [users]);

  useEffect(() => {
    // Filter users based on search term
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <h1>Crypto Dashboard</h1>

      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name or symbol" />
      <button onClick={() => setSearchTerm("")}>Clear</button>

      <div>
        <h2>Summary Statistics</h2>
        <p>Total Items: {totalItems}</p>
        <p>Average Price (USD): ${averagePrice.toFixed(2)}</p>
        <p>Highest Price (USD): ${highestPrice.toFixed(2)}</p>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Supply</th>
            <th>Change Percent 24 Hr</th>
            <th>Price USD</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.symbol}</td>
              <td>{user.supply}</td>
              <td>{user.changePercent24Hr}%</td>
              <td>${user.priceUsd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
