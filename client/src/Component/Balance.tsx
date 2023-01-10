interface BalanceProps {
    balance: number;
}

const Balance = ({}): JSX.Element => {
    const balance = "1234";
    return (<div className="card">
        <h2 className="card-title">Votre Balance</h2>

        <strong>{balance}</strong>
        
        </div>)
}

export default Balance;