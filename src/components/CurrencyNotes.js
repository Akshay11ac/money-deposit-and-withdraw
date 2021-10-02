const CurrencyNotes = ({ currencies }) => {
  return (
    <div className="currency-container">
      <div className="currency-item table-header">
        <div>Currency Note</div>
        <div>No of Totals</div>
        <div>Total</div>
      </div>
      {currencies.map((data, idx) => {
        return data.qty ? (
          <div key={idx} className="currency-item table-value">
            <div>{data.note}</div>
            <div>{data.qty}</div>
            <div>{data.note * data.qty}</div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default CurrencyNotes;
