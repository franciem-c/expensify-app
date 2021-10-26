import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import RemoveModal from './RemoveModal';

export class EditExpensePage extends React.Component {
    state = {
        selectedOption: undefined
    }
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };
    onRemove = () => {
        this.setState(() => ({selectedOption: this.props.expense}));
    };
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };
    handleRemove = () => {
        this.setState(() => ({selectedOption: this.props.expense}));
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <RemoveModal 
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                        handleRemove={this.handleRemove}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>
                        Remove Expense
                    </button>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);