import "./Info.css";

function Info({ principal }) {
  return (
    <div className="main">
      <div className="input_card">
        <span className="title" style={{ color: "#ff9800" }}>
          About You
        </span>
        <div className="Input">
          <p className="subtitle">
            <strong>Principal:</strong> {principal || "Loading..."}
          </p>
          <p className="subtitle">
            Welcome to the DCA Token Dashboard! Here you can mine, send tokens,
            and view your transactions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
