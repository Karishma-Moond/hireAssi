import React, { useState, useEffect } from 'react';

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const response = await fetch('https://canopy-frontend-task.vercel.app/api/holdings');
      const data = await response.json();
      setHoldings(data.payload);
    } catch (error) {
      console.error('Error fetching holdings:', error);
    }
  };

  const groupHoldingsByAssetClass = () => {
    const groupedHoldings = {};
    holdings.forEach((holding) => {
      if (!groupedHoldings[holding.asset_class]) {
        groupedHoldings[holding.asset_class] = [];
      }
      groupedHoldings[holding.asset_class].push(holding);
    });
    return groupedHoldings;
  };
  return (
    <div className="table-container">
      <h1 className="table-heading">Table Holding</h1>
      <table className="holdings-table">
      <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Ticker</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Asset Class</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Avg Price</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Market Price</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Latest Change (%)</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Market Value (Base CCY)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupHoldingsByAssetClass()).map((assetClass, index) => (
            <tr key={index}>
              <td colSpan="7" style={{ border: '1px solid black', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                {assetClass}
              </td>
            </tr>
          ))}
          {Object.entries(groupHoldingsByAssetClass()).map(([assetClass, holdings], index) => (
            holdings.map((holding, idx) => (
              <tr key={index + '-' + idx}>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{holding.name}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{holding.ticker}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{holding.asset_class}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{holding.avg_price}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{holding.market_price}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{holding.latest_chg_pct}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{holding.market_value_ccy}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
