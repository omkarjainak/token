import "./Send.css";
import { useState, useEffect } from "react";

function Send({
  balance,
  loading,
  setSendPrincipal,
  handleSend,
  sendPrincipal,
  sendAmount,
  setSendAmount,
}) {
  return (
    <div className="main">
      <div className="send_input_card">
        <span className="title">
          Send <span style={{ color: "#ff9800" }}>DCA</span> Tokens
        </span>
        <div className="Input">
          <span className="subtitle">
            Enter the amount of DCA Tokens you want to send.
          </span>
          <form className="dca-form" onSubmit={handleSend}>
            <div className="input-container">
              <input
                min="1"
                value={sendPrincipal}
                onChange={(e) => setSendPrincipal(e.target.value)}
                type="text"
                placeholder="Receiver Principal"
              />
              <input
                type="number"
                min="1"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="Amount"
              />
              <button className="mine-button" type="submit" disabled={loading}>
                Send
              </button>
            </div>
          </form>
        </div>
        <div className="buttons"></div>
      </div>
    </div>
  );
}

export default Send;
