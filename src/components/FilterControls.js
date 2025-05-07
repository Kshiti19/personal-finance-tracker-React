import React, { useState, useEffect } from 'react';
import './FilterControls.css';

function FilterControls({ onFilterChange, currentFilter, currentDate }) {
  const [selectedMonth, setSelectedMonth] = useState(
    `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
  );
  const [selectedWeekDate, setSelectedWeekDate] = useState(
    currentDate.toISOString().slice(0, 10)
  );

  useEffect(() => {
    setSelectedMonth(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`);
    setSelectedWeekDate(currentDate.toISOString().slice(0, 10));
  }, [currentDate]);


  const handleFilterTypeChange = (e) => {
    const newFilterType = e.target.value;
    if (newFilterType === 'all') {
      onFilterChange('all', new Date()); 
    } else if (newFilterType === 'month') {
      onFilterChange('month', new Date(selectedMonth + '-01T00:00:00')); 
    } else if (newFilterType === 'week') {
      onFilterChange('week', new Date(selectedWeekDate + 'T00:00:00'));
    }
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    if (currentFilter === 'month') {
      onFilterChange('month', new Date(newMonth + '-01T00:00:00'));
    }
  };

  const handleWeekDateChange = (e) => {
    const newWeekDate = e.target.value;
    setSelectedWeekDate(newWeekDate);
    if (currentFilter === 'week') {
      onFilterChange('week', new Date(newWeekDate + 'T00:00:00'));
    }
  };


  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="filterType">View:</label>
        <select id="filterType" value={currentFilter} onChange={handleFilterTypeChange}>
          <option value="all">All Transactions</option>
          <option value="month">By Month</option>
          <option value="week">By Week</option>
        </select>
      </div>

      {currentFilter === 'month' && (
        <div className="filter-group">
          <label htmlFor="monthPicker">Select Month:</label>
          <input
            type="month"
            id="monthPicker"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
        </div>
      )}

      {currentFilter === 'week' && (
        <div className="filter-group">
          <label htmlFor="weekPicker">Select Date in Week:</label>
          <input
            type="date"
            id="weekPicker"
            value={selectedWeekDate}
            onChange={handleWeekDateChange}
          />
        </div>
      )}
    </div>
  );
}

export default FilterControls;