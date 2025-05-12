from abc import ABC, abstractmethod
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from .database import Base

class Account(Base):
    __tablename__ = 'accounts'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    balance = Column(Float, default=0.0)
    type = Column(String, nullable=False)
    
    transactions = relationship("Transaction", back_populates="account")
    
    @abstractmethod
    def calculate_interest(self):
        pass
    
    def add_transaction(self, transaction):
        self.transactions.append(transaction)
        self.balance += transaction.amount

class SavingsAccount(Account):
    def calculate_interest(self):
        return self.balance * 0.02  # 2% interest rate

class CheckingAccount(Account):
    def calculate_interest(self):
        return self.balance * 0.01  # 1% interest rate

class InvestmentAccount(Account):
    def calculate_interest(self):
        return self.balance * 0.05  # 5% interest rate 