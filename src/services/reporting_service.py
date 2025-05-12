import matplotlib.pyplot as plt
import pandas as pd
from typing import List
from ..core.transaction import Transaction

class ReportingService:
    def generate_spending_report(self, transactions: List[Transaction]):
        df = pd.DataFrame([(t.amount, t.category) for t in transactions],
                         columns=['amount', 'category'])
        
        # Create pie chart
        plt.figure(figsize=(10, 6))
        df.groupby('category')['amount'].sum().plot(kind='pie', autopct='%1.1f%%')
        plt.title('Spending by Category')
        plt.savefig('spending_report.png')
        
    def generate_income_vs_expenses(self, transactions: List[Transaction]):
        df = pd.DataFrame([(t.amount, t.date) for t in transactions],
                         columns=['amount', 'date'])
        
        # Create line chart
        plt.figure(figsize=(10, 6))
        df.groupby('date')['amount'].sum().plot(kind='line')
        plt.title('Income vs Expenses Over Time')
        plt.savefig('income_expenses_report.png') 