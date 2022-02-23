import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './components/Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=60&page=1&sparkline=false")
    .then((res) => {
      setCoins(res.data);
      console.log(res.data);
    })
    .catch((err) => console.error(err))
  },[]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterCoins = coins.filter((coin) =>
   coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className = "header">
        <h1 className="brand"><i className="fas fa-moon"></i>CoinTracker</h1>
        <form>
          <input className='inputField' type="text" onChange={handleChange} placeholder='Search a coin'></input>
        </form>
      </div>
      <div className='coinContainer'>
      {filterCoins.map((coin) => {
        return (
          <Coin 
          key={coin.id}
          name = {coin.name}
          price = {coin.current_price}
          symbol = {coin.symbol}
          marketcap = {coin.market_cap}
          volume = {coin.total_volume}
          image = {coin.image}
          priceChange = {coin.price_change_percentage_24h} 
          />
          );
      })
      }
      </div>
    </div>
  );
}

export default App;
