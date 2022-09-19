import Ticker from "react-ticker";
import React, { Component, useState } from "react";
import Axios from "axios";
import "./Home.css";
import { wait } from "@testing-library/user-event/dist/utils";

function Home() {
  const _APIKEY = "54ff816144462eb7ce61a1fd81afb014";

  const [topStocks, setTopStocks] = useState([]);
  const [loserStocks, setLoserStocks] = useState([]);
  const [stockArr, setStockArr] = useState([]);

  const [name, setName] = useState("");

  const handleInput = (event) => {
    setName(event.target.value);
  };

  const logValue = () => {
    Axios.get(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        name +
        "&interval=60min&outputsize=full&apikey=ZGE19H5HOBZKLLHD"
    ).then((response) => {
      var metadata = response.data["Meta Data"]["3. Last Refreshed"];
      var open = response.data["Time Series (60min)"][metadata]["1. open"];
      var high = response.data["Time Series (60min)"][metadata]["2. high"];
      var low = response.data["Time Series (60min)"][metadata]["3. low"];
      var close = response.data["Time Series (60min)"][metadata]["4. close"];
      var volume = response.data["Time Series (60min)"][metadata]["5. volume"];

      var stockArray = { open, high, low, close, volume };
      setStockArr(stockArray);
    });
  };

  const getGainers = () => {
    Axios.get(
      "https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=" +
        _APIKEY
    ).then(async (response) => {
      var arr = [];
      for (var j = 0; j < 10; j++) {
        var name = response.data[j].name;
        var symbol = response.data[j].symbol;
        var percent = response.data[j].changesPercentage;
        percent = parseFloat(percent.toFixed(2));
        var change = response.data[j].change;
        var price = response.data[j].price;
        arr.push({ name, symbol, percent, change, price });
      }
      setTopStocks(arr);
    });
  };

  const getLosers = () => {
    Axios.get(
      "https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=" +
        _APIKEY
    ).then((response) => {
      var arr = [];
      for (var j = 0; j < 10; j++) {
        var name = response.data[j].name;
        var symbol = response.data[j].symbol;
        var percent = response.data[j].changesPercentage;
        percent = parseFloat(percent.toFixed(2));
        var change = response.data[j].change;
        var price = response.data[j].price;
        arr.push({ name, symbol, percent, change, price });
      }
      setLoserStocks(arr);
    });
  };

  return (
    <div className="background">
      <h1>The Sheriff of Nottingham</h1>
      <h5>Stock data on your fingertips!</h5>
      <button onClick={getGainers}>Get Gainers</button>
      <button onClick={getLosers}>Get Losers</button>
      {/* <div className="ticker-wrapper">
        <div className="bigheading">Breaking</div>
        <div className="text-update">
          <p>
            Example example exampleExample example exampleExample example
            exampleExample example example
          </p>
        </div>
      </div> */}

      <div className="container">
        <div>
          <h3>Top Gainers (today)</h3>
          <div className="containGain">
            <div className="square">
              <table className="table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Market Value</th>
                    <th>Change</th>
                    <th>Percent Change (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {topStocks.map((gainers, index) => {
                    return (
                      <tr key={index}>
                        <td>{gainers.symbol}</td>
                        <td>{gainers.name}</td>
                        <td>{gainers.price}</td>
                        <td>{gainers.change}</td>
                        <td>{gainers.percent}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="graphGainer"></div>
          </div>
        </div>
        <div>
          <h3>Top Losers (today)</h3>
          <div className="containLoss">
            <div className="square2">
              <table className="table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Market Value</th>
                    <th>Change</th>
                    <th>Percent Change (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {loserStocks.map((gainers, index) => {
                    return (
                      <tr key={index}>
                        <td>{gainers.symbol}</td>
                        <td>{gainers.name}</td>
                        <td>{gainers.price}</td>
                        <td>{gainers.change}</td>
                        <td>{gainers.percent}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="graphLoser"></div>
          </div>
        </div>
      </div>
      <div>
        <input onChange={handleInput} placeholder="Search Stock" />
        <button onClick={logValue}>Search</button>
      </div>
      <div className="stockContainer">
        <div>
          <div>Open: {stockArr.open}</div>
          <div>High: {stockArr.high}</div>
          <div>Low: {stockArr.low}</div>
        </div>
        <div>
          <div>Close: {stockArr.close}</div>
          <div>Volume: {stockArr.volume}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
