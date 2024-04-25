import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "../ExpenseFilter/ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";
import Card from "../UI/Card";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2021");
  const [selectedYearSalaries, setSelectedYearSalaries] = useState({});
  const [bonus, setBonus] = useState(0);
  const [bonusDate, setBonusDate] = useState("");

  const selectYear = (year) => {
    setFilteredYear(year);
    setSelectedYearSalaries({});
  };

  const handleMonthlySalaryChange = (event, month) => {
    setSelectedYearSalaries((prevSalaries) => ({
      ...prevSalaries,
      [month]: event.target.value,
    }));
  };

  const handleBonusChange = (event) => {
    setBonus(event.target.value);
  };

  const handleBonusDateChange = (event) => {
    setBonusDate(event.target.value);
  };

  const handleAddBonus = () => {
    if (!bonusDate || !bonus) {
      return;
    }
    const date = new Date(bonusDate);
    const year = date.getFullYear();
    if (year === parseInt(filteredYear)) {
      const month = date.getMonth();
      const updatedSalaries = { ...selectedYearSalaries };
      const currentBonus = parseFloat(updatedSalaries[month] || 0);
      updatedSalaries[month] = currentBonus + parseFloat(bonus);
      setSelectedYearSalaries(updatedSalaries);
    }
    setBonus(0);
    setBonusDate("");
  };

  return (
    <li>
      <hr />
      <hr />
      <h2 className="h2s">Enter Monthly Salaries Below</h2>
      <div className="new-expense__controls">
        <label htmlFor="yearFilter">Select Year:</label>
        
        <select
          id="yearFilter"
          value={filteredYear}
          onChange={(e) => selectYear(e.target.value)}
          
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2022">2023</option>
          <option value="2022">2024</option>
          <option value="2022">2025</option>
          
         
         
          {/* Add more years as needed */}
        </select>
        
        {Array.from({ length: 12 }).map((_, monthIndex) => (
          <div key={monthIndex}>
            <input
              className="input2"
              type="number"
              placeholder={props.monthNames[monthIndex]}
              value={selectedYearSalaries[monthIndex] || ""}
              onChange={(event) =>
                handleMonthlySalaryChange(event, monthIndex)
              }
            />
            <hr />
          </div>
        ))}
        <div className="bonus">
          <input
            className="input2"
            type="number"
            placeholder="Enter Bonus Amount"
            value={bonus}
            onChange={handleBonusChange}
          />
          <input
            className="input2"
            type="date"
            value={bonusDate}
            onChange={handleBonusDateChange}
          />
          <button className="button" onClick={handleAddBonus}>
            Add Bonus
          </button>
        </div>
      </div>
      <hr />
      <hr />
      <Card className="expenses">
        <ExpensesFilter selected={filteredYear} onSelectYear={selectYear} />
        <hr />
        <hr />
        <ExpensesChart
          expenses={props.items}
          monthlySalaries={selectedYearSalaries}
          selectedYear={filteredYear}
        />
        <hr />
        <ExpensesList items={props.items} />
        <hr />
        <hr />
      </Card>
    </li>
  );
}

export default Expenses;
