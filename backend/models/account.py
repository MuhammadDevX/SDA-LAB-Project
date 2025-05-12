from .database import db

class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    balance = db.Column(db.Float, default=0.0)
    type = db.Column(db.String, nullable=False)
    transactions = db.relationship('Transaction', backref='account', lazy=True)
    __mapper_args__ = {
        'polymorphic_identity': 'account',
        'polymorphic_on': type
    }
    def add_transaction(self, transaction):
        self.transactions.append(transaction)
        self.balance += transaction.amount
    def calculate_interest(self):
        return 0.0

class SavingsAccount(Account):
    __tablename__ = 'savings_accounts'
    id = db.Column(db.Integer, db.ForeignKey('accounts.id'), primary_key=True)
    __mapper_args__ = {'polymorphic_identity': 'savings'}
    def calculate_interest(self):
        return self.balance * 0.02

class CheckingAccount(Account):
    __tablename__ = 'checking_accounts'
    id = db.Column(db.Integer, db.ForeignKey('accounts.id'), primary_key=True)
    __mapper_args__ = {'polymorphic_identity': 'checking'}
    def calculate_interest(self):
        return self.balance * 0.01

class InvestmentAccount(Account):
    __tablename__ = 'investment_accounts'
    id = db.Column(db.Integer, db.ForeignKey('accounts.id'), primary_key=True)
    __mapper_args__ = {'polymorphic_identity': 'investment'}
    def calculate_interest(self):
        return self.balance * 0.05 