import { useEffect, useState } from "react";
import Nav from "./Components/Nav/Nav";
import Mine from "./Components/Mine/Mine";
import Send from "./Components/Send/Send";
import Info from "./Components/info/Info";
import Transactions from "./Components/Transactions/Transactions";

import "./App.css";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../declarations/dca_backend";     
import { canisterId } from "../../declarations/dca_backend";

const identityProvider = "https://identity.ic0.app/#authorize";



function App() {
  const [authClient, setAuthClient] = useState(null);
  const [actor, setActor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("Click Whoami");

  const [activeTab, setActiveTab] = useState("mine");
  const [balance, setBalance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [mineAmount, setMineAmount] = useState("");
  const [mineResult, setMineResult] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendPrincipal, setSendPrincipal] = useState("");
  const [sendResult, setSendResult] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [sellResult, setSellResult] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initAuth();
  }, []);

 const initAuth = async () => {
  const client = await AuthClient.create();
  const identity = client.getIdentity();
  const actorInstance = createActor(canisterId, {
    agentOptions: { identity },
  });

  const isAuth = await client.isAuthenticated();
  setAuthClient(client);
  setActor(actorInstance);
  setIsAuthenticated(isAuth);

  if (isAuth) {
    const principal = identity.getPrincipal().toText();
    setPrincipal(principal);
    // Register this principal in backend storage
    await actorInstance.register_login();
    
    await fetchBalance(actorInstance);
    await fetchTotalSupply(actorInstance);
    await fetchTransactions(actorInstance);
  }
};


  const login = async () => {
    if (!authClient) return;
    await authClient.login({
      identityProvider,
      onSuccess: initAuth,
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    initAuth();
  };

  const whoami = async () => {
    if (!actor) return;
    setPrincipal("Loading...");
    const result = await actor.whoami();
    setPrincipal(result.toString());
  };

  const handleResult = (res, setResult) => {
    if (typeof res === "string") return setResult(res);
    if (res?.Err) return setResult(`Error: ${res.Err}`);
    if (res?.Ok) return setResult(res.Ok);
    setResult("Unknown error.");
  };

  const fetchBalance = async (a = actor) => {
    setLoading(true);
    try {
      const bal = await a.get_my_balance();
      setBalance(Number(bal));
    } catch {
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalSupply = async (a = actor) => {
    try {
      const supply = await a.get_total_supply();
      setTotalSupply(Number(supply));
    } catch {
      setTotalSupply(0);
    }
  };

  const fetchTransactions = async (a = actor) => {
    try {
      const txs = await a.get_my_transactions();
      setTransactions(txs.reverse());
    } catch {
      setTransactions([]);
    }
  };

  const handleMine = async (e) => {
    e.preventDefault();
    setMineResult("");
    const amt = Number(mineAmount);
    if (amt > 0) {
      setLoading(true);
      const res = await actor.mine_tokens(amt);
      handleResult(res, setMineResult);
      await fetchBalance();
      await fetchTotalSupply();
      await fetchTransactions();
      setLoading(false);
      alert(`Successfully mined ${amt} DCA Tokens!`);
    } else {
      setMineResult("Enter a valid amount.");
      alert("Please enter a valid amount to mine.");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setSendResult("");

    const amt = Number(sendAmount);

    try {
      if (sendPrincipal && amt > 0) {
        setLoading(true);

        // ✅ Trim input before converting to Principal
        const recipientPrincipal = Principal.fromText(sendPrincipal.trim());

        // ✅ Send tokens
        const res = await actor.send_tokens(recipientPrincipal, amt);

        handleResult(res, setSendResult);
        await fetchBalance();
        await fetchTransactions();
        alert(
          `Successfully sent ${amt} DCA Tokens to ${recipientPrincipal.toText()}!`
        );
      } else {
        setSendResult("Enter a valid principal and amount.");
        alert("Please enter a valid principal and amount to send.");
      }
    } catch (err) {
      console.error("Send error:", err);
      setSendResult(
        "Invalid principal format. Make sure it's correct and has no extra spaces."
      );
      alert(
        "Invalid principal format. Make sure it's correct and has no extra spaces."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="dca-main">
               
        {!isAuthenticated && (
          <div className="Login_container">
            <img className="logo" src="logo2.svg" alt="ICP" />
            <div className="Login_card">
              <h3>Log in</h3>
              <p className="Login_text">
                to your <span style={{ color: "#ff9800" }}>ICP</span> identity
              </p>
              <button onClick={login}>Login</button>
            </div>
          </div>
        )}
        {isAuthenticated ? (
          <>
            <Nav
              balance={balance}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              principal={principal}
              whoami={whoami}
              logout={logout}
              fetchBalance={fetchBalance}
              fetchTransactions={fetchTransactions}
            />
            {activeTab === "mine" && (
              <div className="tab-content active">
                <Mine
                  TotalSupply={totalSupply}
                  handleMine={handleMine}
                  loading={loading}
                  mineAmount={mineAmount}
                  setMineAmount={setMineAmount}
                />
              </div>
            )}

            {activeTab === "send" && (
              <div className="tab-content active">
                <Send
                  handleSend={handleSend}
                  balance={balance}
                  loading={loading}
                  setSendPrincipal={setSendPrincipal}
                  sendPrincipal={sendPrincipal}
                  sendAmount={sendAmount}
                  setSendAmount={setSendAmount}
                />
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="tab-content active">
                <Transactions transactions={transactions} loading={loading} />
              </div>
            )}
            {activeTab === "about" && <Info principal={principal} />}

          </>
        ) : (
          <div className="dca-unauthenticated-message">
            <p>Please login to access the dapp.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
