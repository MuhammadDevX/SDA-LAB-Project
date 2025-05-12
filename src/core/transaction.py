from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Transaction(Base):
    __tablename__ = 'transactions'
    
    id = Column(Integer, primary_key=True)
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    account_id = Column(Integer, ForeignKey('accounts.id'))
    
    account = relationship("Account", back_populates="transactions")
    
    def __repr__(self):
        return f"<Transaction(amount={self.amount}, category={self.category})>" 