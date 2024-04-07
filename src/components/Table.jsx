import { Link } from "react-router-dom";

const Table = ({ filteredItems }) => {
    return (
        <>
            <div className="list">
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
                        {filteredItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <Link to={{
                                        pathname: `/details/${item.id}`,
                                        state: { itemData: item }
                                    }}>{item.name}</Link>
                                </td>
                                <td>{item.symbol}</td>
                                <td>{item.supply}</td>
                                <td>{item.changePercent24Hr}%</td>
                                <td>${item.priceUsd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;