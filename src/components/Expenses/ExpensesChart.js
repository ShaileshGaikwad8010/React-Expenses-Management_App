import React from "react";
import ChartComponent from "../Chart/Chart";
import "./ExpenseItem.css";
import Card from "../UI/Card";

const ExpensesChart = ({ expenses, monthlySalaries }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = React.useState("");

  // Calculate expenses for each month
  const chartDataPoints = Array.from({ length: 12 }, (_, monthIndex) => {
    const monthExpenses = expenses
      .filter((expense) => expense.date.getMonth() === monthIndex)
      .reduce((acc, expense) => acc + parseFloat(expense.amount), 0); // Ensure expense.amount is parsed as a number

    return { label: monthNames[monthIndex], value: monthExpenses };
  });

  // Calculate remaining salary for each month
  const remainingSalaries = chartDataPoints.map((dataPoint, index) => {
    const baseSalary = parseFloat(monthlySalaries[index] || 0);
    return baseSalary - dataPoint.value;
  });

  // Filter remaining salaries based on the selected month
  const filteredRemainingSalaries = selectedMonth
    ? [remainingSalaries[monthNames.indexOf(selectedMonth)]]
    : remainingSalaries;

  // Calculate total expenses for the year
  const totalExpenses = parseFloat(
    expenses
      .reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
      .toFixed(2)
  );

  return (
    <>
      {/* Render remaining salary for the selected month */}
      <div className="remaining">
        <h2>Remaining Salary</h2>
        <label htmlFor="monthFilter">Filter by Month:</label>
        <select
          id="monthFilter"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {monthNames.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      {filteredRemainingSalaries.map((remainingSalary, index) => (
        <Card className="expense-item" key={index}>
          <h3 style={{ color: "white" }}>
            Remaining Salary for{" "}
            {selectedMonth
              ? selectedMonth
              : chartDataPoints[index].label}
            : ₹{remainingSalary}
          </h3>
         
        </Card>
        
      ))}
      {/* Render the chart */}
      <hr /><hr />
      <ChartComponent
        expensesDataPoints={chartDataPoints.map(({ label, value }) => ({
          label,
          value,
        }))}
        savingsDataPoints={chartDataPoints.map(({ label, value }) => ({
          label,
          value: parseFloat(monthlySalaries[monthNames.indexOf(label)] || 0) - value,
        }))}
      />
      {/* Display total expenses and total saving */}
      <div style={{ color: "white" }}>
        <p>Total Expenses for the year: ₹{totalExpenses}</p>
      </div>
    </>
  );
};

export default ExpensesChart;
