import pandas as pd

class ReportingService:
    def generate_spending_report(self, transactions):
        df = pd.DataFrame([{'amount': t.amount, 'category': t.category} for t in transactions])
        if df.empty:
            return []
        spending = df[df['amount'] < 0].groupby('category')['amount'].sum().abs().reset_index()
        return spending.to_dict(orient='records')

    def generate_income_vs_expenses(self, transactions):
        df = pd.DataFrame([{'amount': t.amount, 'date': t.date.date().isoformat()} for t in transactions])
        if df.empty:
            return []
        grouped = df.groupby('date')['amount'].sum().reset_index()
        grouped['income'] = grouped['amount'].apply(lambda x: x if x > 0 else 0)
        grouped['expense'] = grouped['amount'].apply(lambda x: abs(x) if x < 0 else 0)
        return grouped[['date', 'income', 'expense']].to_dict(orient='records') 