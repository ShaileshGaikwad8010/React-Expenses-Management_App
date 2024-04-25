import React, { useState } from 'react';
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleMonthFilterChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    let filteredExpenses = props.items;
    if (selectedMonth !== '') {
        const selectedMonthIndex = new Date(selectedMonth + ' 1, 2000').getMonth();
        filteredExpenses = props.items.filter(expense => expense.date.getMonth() === selectedMonthIndex);
    }

    if (filteredExpenses.length === 0) {
        return (
            
            <div className="expenses-list__fallback">
                <hr />
               <h2>Expenses</h2>
                <select className='drp' value={selectedMonth} onChange={handleMonthFilterChange}>
                    filter by month<option value="">All Months</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <h2>No expenses found.</h2>
            </div>
        );
    };

    return (
        <div className="expenses-list">
            <select className='drp' value={selectedMonth} onChange={handleMonthFilterChange}>
                <option value="">All Months</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            <ul>
                {filteredExpenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        title={expense.title}
                        amount={expense.amount}
                        date={expense.date}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ExpensesList;
