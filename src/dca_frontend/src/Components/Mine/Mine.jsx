import "./Mine.css";

function Mine({ TotalSupply, handleMine, loading, mineAmount, setMineAmount }) {
  return (
    <div className="main">
      <div className="input_card">
        <span className="title">
          Mine <span style={{ color: "#ff9800" }}>DCA</span> Tokens
        </span>
        <div className="Input">
          <span className="subtitle">
            Enter the amount of DCA Tokens you want to mine.
          </span>
          <form className="dca-form" onSubmit={handleMine}>
            <div className="input-container">
              <input
                min="1"
                value={mineAmount}
                onChange={(e) => setMineAmount(e.target.value)}
                type="text"
                placeholder="Number of DCA's"
              />
              <button className="mine-button" type="submit" disabled={loading}>
                Mine
              </button>
            </div>
          </form>
        </div>
        <div className="buttons"></div>
      </div>
    </div>
  );
}

export default Mine;
