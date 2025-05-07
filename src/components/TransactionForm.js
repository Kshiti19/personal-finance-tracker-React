import React, { useState } from 'react';
import './TransactionForm.css';

function TransactionForm({ onAddTransaction }){
    const [type, setType] = useState('income');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const trimmedDescription = description.trim();
        const trimmedAmount = amount.trim(); // Trim amount string before parsing
        const numericAmount = parseFloat(trimmedAmount);
        
        if (!trimmedDescription || trimmedAmount === '' || isNaN(numericAmount)) {
            let alertMessage = 'Please fill in all fields correctly.';
            if (!trimmedDescription) {
              alertMessage += ' Description cannot be empty.';
            }
            if (trimmedAmount === '' || isNaN(numericAmount)) {
              alertMessage += ' Amount must be a valid number.';
            }
            alert(alertMessage);
            return;
          }

        onAddTransaction({
        type,
        description,
        amount: parseFloat(amount),
        date,
    });
    setDescription('');
    setAmount('');

};

return (
    <form onSubmit={handleSubmit} className='transaction-form'>
        <h3>Add New Transaction</h3>
        <div>
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                </select>
        </div>
        
        <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required // HTML5 validation
        />
      </div>
      
        <div>
    <label htmlFor='amount'>Amount:</label>
    <input
        type="number"
        id="amount"
        value={amount}
        onChangeCapture={(e) => setAmount(e.target.value)}
        required
        step="0.01"
        />
        </div>

        <div>
            <label htmlFor="date">Date:</label>
            <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            />
            </div>
            <button type="submit">Add Transaction</button>
        </form>
);
}
export default TransactionForm;