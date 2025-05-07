import React, { useState, useEffect, useMemo } from 'react'; 
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import Charts from './components/Charts';
import FilterControls from './components/FilterControls'; 
import ExportControls from './components/ExportControls';

const getWeekRange = (date) => {
  const d = new Date(date);
  const day = d.getDay(); 
  const diffToMonday = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diffToMonday));
  monday.setHours(0,0,0,0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23,59,59,999);
  return { start: monday, end: sunday };
};


function App() {
  const [allTransactions, setAllTransactions] = useState([]); // Renamed from transactions
  const [filter, setFilter] = useState('all'); // 'all', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date()); // For 'week' and 'month' context

  
  // Load transactions from localStorage
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      setAllTransactions(storedTransactions.map(t => ({...t, date: new Date(t.date)}))); // Ensure date is Date object
    }
  }, []);

  
  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(allTransactions));
  }, [allTransactions]);

  const addTransaction = (transaction) => {
    setAllTransactions([...allTransactions, { ...transaction, id: Date.now(), date: new Date(transaction.date) }]);
  };

  const deleteTransaction = (id) => {
    setAllTransactions(allTransactions.filter(transaction => transaction.id !== id));
  };

  const handleFilterChange = (newFilter, newDate) => {
    setFilter(newFilter);
    if (newDate) setCurrentDate(new Date(newDate)); 
  };

  // Memoized filtered transactions
  const filteredTransactions = useMemo(() => {
    if (filter === 'all') {
      return allTransactions;
    }
    return allTransactions.filter(t => {
      const transactionDate = new Date(t.date); 
      if (filter === 'week') {
        const { start, end } = getWeekRange(currentDate);
        return transactionDate >= start && transactionDate <= end;
      }
      if (filter === 'month') {
        return transactionDate.getFullYear() === currentDate.getFullYear() &&
               transactionDate.getMonth() === currentDate.getMonth();
      }
      return true; 
    });
  }, [allTransactions, filter, currentDate]);

  return (
    <div className="container">
      <header>
        <h1>Personal Finance Tracker</h1>
      </header>
      <main>
        <FilterControls onFilterChange={handleFilterChange} currentFilter={filter} currentDate={currentDate} />
        <Summary transactions={filteredTransactions} />
        <Charts transactions={filteredTransactions} />
        <TransactionForm onAddTransaction={addTransaction} />
        <TransactionList transactions={filteredTransactions} onDeleteTransaction={deleteTransaction} />
        <ExportControls transactions={filteredTransactions} currentFilter={filter} />
      </main>
    </div>
  );
}

export default App;