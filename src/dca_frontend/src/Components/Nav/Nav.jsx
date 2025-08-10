import { useState, useEffect } from "react";
import "./Nav.css";

function Nav({
  balance,
  activeTab,
  setActiveTab,
  principal,
  logout,
  fetchBalance,
  fetchTransactions,
}) {
  const navItems = [
    { key: "mine", label: "Mine" },
    { key: "send", label: "Send" },
    { key: "transactions", label: "Transactions" },
    { key: "about", label: "Info" },
  ];
  const [hover, setHover] = useState(false);

  return (
    <nav className="dca-nav">

      <ul className="dca-nav-list">
        {navItems.map((item) => {
          const liKey = item.key;

          return (
            <li
              key={liKey}
              className={`dca-nav-item${
                activeTab === item.key ? " active" : ""
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
      <div
        className="card"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="img"></div>
        <div className="textBox">
          <div className="textContent">
            <p className="h1">Principal:</p>
            <span className="span">
              {hover ? principal : `${principal.slice(0, 11)}...`}
            </span>
          </div>
          <p className="p">
            Balance - <span style={{ color: "#ff9800" }}>{balance}</span>
          </p>
          <div className="btns">
            <button className="logout" onClick={logout}>
              Logout
            </button>
            <button
              onClick={() => {
                fetchBalance();
                fetchTransactions();
              }}
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
