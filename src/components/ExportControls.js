// src/components/ExportControls.js
import React from 'react';
import Papa from 'papaparse';
import './ExportControls.css';

function ExportControls({ transactions, currentFilter }) {
  const handleExportCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export.");
      return;
    }

    // Prepare data: flatten or select specific fields
    const dataToExport = transactions.map(t => ({
      Date: new Date(t.date).toLocaleDateString(), // Format date nicely
      Type: t.type,
      Description: t.description,
      Amount: t.amount.toFixed(2)
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_${currentFilter}_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export (placeholder - more complex)
  const handleExportPDF = () => {
    alert("PDF export is a more advanced feature and not implemented in this basic version. Consider using libraries like jsPDF and jsPDF-AutoTable.");
    // To implement:
    // 1. Install jspdf and jspdf-autotable: npm install jspdf jspdf-autotable
    // 2. Import them: import jsPDF from 'jspdf'; import 'jspdf-autotable';
    // 3. Generate PDF:
    //    const doc = new jsPDF();
    //    doc.autoTable({
    //      head: [['Date', 'Type', 'Description', 'Amount']],
    //      body: transactions.map(t => [new Date(t.date).toLocaleDateString(), t.type, t.description, t.amount.toFixed(2)]),
    //    });
    //    doc.save(`transactions_${currentFilter}_${new Date().toISOString().slice(0,10)}.pdf`);
  };


  return (
    <div className="export-controls">
      <h4>Export Data</h4>
      <button onClick={handleExportCSV} className="export-btn csv">Export as CSV</button>
      <button onClick={handleExportPDF} className="export-btn pdf">Export as PDF (Future)</button>
    </div>
  );
}

export default ExportControls;