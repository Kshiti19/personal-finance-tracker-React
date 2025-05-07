import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Charts.css';


const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#8884d8'];

function Charts({ transactions }) {
  const pieChartData = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    return [
      { name: 'Total Income', value: income },
      { name: 'Total Expenses', value: expenses },
    ];
  }, [transactions]);

  const barChartData = useMemo(() => {
    const monthlyData = {};
    transactions.forEach(t => {
      const monthYear = new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { name: monthYear, income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        monthlyData[monthYear].income += t.amount;
      } else {
        monthlyData[monthYear].expense += t.amount;
      }
    });
    return Object.values(monthlyData).sort((a, b) => new Date(a.name) - new Date(b.name));
  }, [transactions]);

  if (transactions.length === 0) {
    return <p className="no-data-charts">No data available for charts. Add some transactions!</p>;
  }

  return (
    <div className="charts-container">
      <div className="chart-wrapper">
        <h3>Income vs. Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData.filter(d => d.value > 0)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8" 
              dataKey="value"
            >
              {pieChartData.filter(d => d.value > 0).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {barChartData.length > 0 && (
        <div className="chart-wrapper">
          <h3>Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="income" fill="#00C49F" name="Income" />
              <Bar dataKey="expense" fill="#FF8042" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Charts;