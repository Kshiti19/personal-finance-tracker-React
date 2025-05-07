import React from 'react';
import './TransactionList.css'

function TransactionList({ transactions, onDeleteTransaction }) { // Added onDeleteTransaction
    if (!transactions || transactions.length === 0) {
        return <p className='no-transactions'>No Transactions Yet. Add some!</p>
    }
    
    const sortedTransactions = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date));

    return (
        <div className='transaction-list'>
            <h3>Transaction History</h3>
            <ul>
                {sortedTransactions.map((transaction) => (
                    <li key={transaction.id} className={`transaction-item${transaction.type}`}>
                        <span className='description'>{transaction.description}</span>
                        <span className='date'>{new Date(transaction.date).toLocaleDateString()}</span>
                        <span className={`amount ${transaction.type}`}>
                            {transaction.type === 'income' ? '+' :'-'}${transaction.amount.toFixed(2)}
                        </span>
                        {onDeleteTransaction && (
                            <button onClick={() => onDeleteTransaction(transaction.id)}className='delete-btn'>X</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>

    );

}

export default TransactionList;