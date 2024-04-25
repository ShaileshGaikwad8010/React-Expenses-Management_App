import { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) => {

    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     enteredAmount: '',
    //     enteredDate: ''
    // });

    const handleChangeTitle = (event) => {
        setEnteredTitle(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enteredTitle: event.target.value
        // })
        // setUserInput((prevState) => {
        //     return { ...prevState, enteredTitle: event.target.value }
        // });
    }
    const hadleChangeAmount = (event) => {
        setEnteredAmount(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enteredAmount: event.target.value
        // })
        // setUserInput((prevState) => {
        //     return { ...prevState, enteredAmount: event.target.value }
        // });
    }
    const handleChangeDate = (event) => {
        setEnteredDate(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enteredDate: event.target.value
        // })
        // setUserInput((prevState) => {
        //     return { ...prevState, enteredDate: event.target.value }
        // });
    }
    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        };

        props.onSaveExpenseData(expenseData);
        setEnteredTitle('');
        setEnteredDate('');
        setEnteredAmount('');
        handleClick();

    };



    // const handleClickCancel = () => {
    //     setIsClicked(false);
    // }


    if (isClicked) {
        return (
            <form onSubmit={handleSubmit}>
                <div className="new-expense__controls">
                    <div className="new-expense__controls">
                        
                        <input className='input' type="text" placeholder='Title' value={enteredTitle} onChange={handleChangeTitle} />
                    </div>
                    <div className="new-expense__controls">
                        
                        <input className='input' type="number" placeholder='amount' value={enteredAmount} min="0.01" step="0.01" onChange={hadleChangeAmount} />
                    </div>
                    <div className="new-expense__controls">
                        
                        <input className='input' type="date" value={enteredDate} min="2021-01-01" max="2025-12-31" onChange={handleChangeDate} />
                    </div>
                </div>
                <div className="new-expense__actions">
                    <button onClick={handleClick} >Cancel</button>
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        )
    } else {
        return <button onClick={handleClick}>Add New Expens</button>
    }

};
export default ExpenseForm;