import React, { useMemo } from 'react';
import './Summary.css'; 

function Summary({ transactions }) {
  const summaryData = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance };
  }, [transactions]); // Recalculate only when transactions change

  return (
    <div className="summary-container">
      <div className="summary-box income">
        <h4>Total Income</h4>
        <p>${summaryData.totalIncome.toFixed(2)}</p>
      </div>
      <div className="summary-box expense">
        <h4>Total Expenses</h4>
        <p>${summaryData.totalExpenses.toFixed(2)}</p>
      </div>
      <div className="summary-box balance">
        <h4>Balance</h4>
        <p>${summaryData.balance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Summary;