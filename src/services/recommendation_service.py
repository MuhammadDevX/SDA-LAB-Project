from typing import List
from ..core.transaction import Transaction

class RecommendationService:
    def __init__(self):
        self.spending_thresholds = {
            'dining': 0.15,
            'entertainment': 0.10,
            'shopping': 0.20
        }
    
    def analyze_spending(self, transactions: List[Transaction]) -> List[str]:
        recommendations = []
        
        # Calculate spending by category
        spending_by_category = {}
        for transaction in transactions:
            if transaction.amount < 0:  # Only consider expenses
                category = transaction.category
                spending_by_category[category] = spending_by_category.get(category, 0) + abs(transaction.amount)
        
        # Generate recommendations
        for category, amount in spending_by_category.items():
            if category in self.spending_thresholds:
                threshold = self.spending_thresholds[category]
                if amount > threshold:
                    recommendations.append(f"Consider reducing spending in {category}")
        
        return recommendations 