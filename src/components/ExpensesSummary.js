import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal, totalExpenses }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
    const hiddenExpenses = totalExpenses - expenseCount;
    const hiddenExpenseWord = hiddenExpenses === 1 ? 'expense' : 'expenses';
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totaling <span>{formattedExpensesTotal}.</span></h1>
                {
                    hiddenExpenses === 0 ? (
                        <h3 className="page-header__subtitle">All expenses shown.</h3>
                    ) : (
                        <h3 className="page-header__subtitle">Not showing <span>{hiddenExpenses}</span> {hiddenExpenseWord} due to filters.</h3>
                    )
                }
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    const totalExpenses = state.expenses.length;

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses),
        totalExpenses
    }
}

export default connect(mapStateToProps)(ExpensesSummary);