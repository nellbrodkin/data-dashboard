import { useParams } from 'react-router-dom';


const Details = ({ data }) => {
    const { id } = useParams();

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    const selectedItem = data.find(item => item.id === id);

    // if undefined item
    if (!selectedItem) {
        return <div>Item not found</div>;
    }

    return (

        <div>
            <h2>{selectedItem.name}</h2>
            <p>Rank: {selectedItem.rank}</p>
            <p>Symbol: {selectedItem.symbol}</p>
            <p>Supply: {selectedItem.supply}</p>
            <p>Market Cap USD: {selectedItem.marketCapUsd}</p>
            <p>Change Percent 24 Hr: {selectedItem.changePercent24Hr}%</p>
            <p>Price USD: ${selectedItem.priceUsd}</p>
            <p>Explorer: {selectedItem.explorer}</p>

        </div>
    );
};

export default Details;