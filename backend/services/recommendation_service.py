class RecommendationService:
    def __init__(self):
        self.spending_thresholds = {
            'dining': 0.15,
            'entertainment': 0.10,
            'shopping': 0.20
        }
    def analyze_spending(self, transactions):
        recommendations = []
        spending_by_category = {}
        total_expense = 0
        for transaction in transactions:
            if transaction.amount < 0:
                category = transaction.category
                spending_by_category[category] = spending_by_category.get(category, 0) + abs(transaction.amount)
                total_expense += abs(transaction.amount)
        for category, amount in spending_by_category.items():
            if category in self.spending_thresholds:
                threshold = self.spending_thresholds[category] * total_expense
                if amount > threshold:
                    recommendations.append(f"Consider reducing spending in {category}")
        if total_expense > 0:
            recommendations.append("Review your expense distribution for better savings.")
        return recommendations 