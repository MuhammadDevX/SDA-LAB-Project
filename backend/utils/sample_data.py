from models.database import db
from models.account import CheckingAccount, SavingsAccount, InvestmentAccount
from models.transaction import Transaction
from models.goal import Goal
from datetime import datetime, timedelta

def populate_sample_data():
    # Accounts
    checking = CheckingAccount(name='Checking', balance=2500)
    savings = SavingsAccount(name='Savings', balance=8000)
    investment = InvestmentAccount(name='Investments', balance=12000)
    db.session.add_all([checking, savings, investment])
    db.session.commit()
    # Transactions
    txs = [
        Transaction(amount=-50, description='Restaurant', category='dining', date=datetime.now() - timedelta(days=5), account_id=checking.id),
        Transaction(amount=2000, description='Salary', category='income', date=datetime.now() - timedelta(days=5), account_id=checking.id),
        Transaction(amount=-100, description='Clothes', category='shopping', date=datetime.now() - timedelta(days=4), account_id=checking.id),
        Transaction(amount=-300, description='Stocks', category='investment', date=datetime.now() - timedelta(days=3), account_id=investment.id),
        Transaction(amount=-80, description='Cafe', category='dining', date=datetime.now() - timedelta(days=2), account_id=checking.id),
    ]
    db.session.add_all(txs)
    db.session.commit()
    # Goals
    goals = [
        Goal(name='Vacation', target_amount=3000, current_amount=1200, deadline=datetime.now() + timedelta(days=200)),
        Goal(name='Emergency Fund', target_amount=5000, current_amount=3500, deadline=datetime.now() + timedelta(days=120)),
    ]
    db.session.add_all(goals)
    db.session.commit() 