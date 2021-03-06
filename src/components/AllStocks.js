import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid';
import { getAll } from '../redux/allstocks/allstocks';
import GobakcBtn from './GobackBtn';
import CompanyDetails from './CompanyDetails';
import '../assets/stylesheets/lists.css';
import '../assets/stylesheets/popular.css';

const AllStocks = () => {
  const globalState = useSelector((state) => state.allStocksReducer);
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [targetSymbol, setTargetSymbol] = useState('');

  const openDetails = (e) => {
    setTargetSymbol(e.target.id);
    setDetailsOpen(true);
    setTimeout(() => {
      setPopupOpen(true);
    }, 200);
  };

  useEffect(() => {
    if (!globalState.length) {
      dispatch(getAll());
      setLocalState(globalState);
    } else {
      setLocalState(globalState);
    }
  }, [globalState]);

  const closeDetails = () => {
    setPopupOpen(false);
    setTimeout(() => {
      setDetailsOpen(false);
    }, 200);
  };

  const filterTheStocks = (e) => {
    if (e.target.value === '') {
      setLocalState(globalState);
    } else {
      setLocalState(
        localState.filter((stock) => {
          const regex = new RegExp(e.target.value, 'gi');
          return stock.symbol.match(regex) || stock.name.match(regex);
        }),
      );
    }
  };

  return (
    <div className="popular-stock-container all-stocks-container">
      <header className="all-main-header">
        <GobakcBtn path="/" />
        <hgroup>
          <h1>All stocks</h1>
          <div className="all-stoct-count">
            <small>Number of stocks: </small>
            <small>{localState.length}</small>
          </div>
        </hgroup>
        <input type="text" placeholder="Search by stock symbol or company name..." onChange={filterTheStocks} onKeyUp={filterTheStocks} />
      </header>
      <div className="main">
        <ul>
          {localState.map((stock) => (
            <button key={uniqid} type="button" className="single-stock" id={stock.symbol} onClick={openDetails}>
              <div id={stock.symbol} className="all-stock-info">
                <p id={stock.symbol}>{stock.name}</p>
                <small id={stock.symbol}>{stock.symbol}</small>
              </div>
              <h3 id={stock.symbol}>
                USD
                {stock.price}
              </h3>
            </button>
          ))}
        </ul>
      </div>
      {detailsOpen
        ? (
          <CompanyDetails
            symbol={targetSymbol}
            openClass={popupOpen ? 'details-open' : ''}
            closeFunction={closeDetails}
          />
        )
        : null }
    </div>

  );
};

export default AllStocks;
