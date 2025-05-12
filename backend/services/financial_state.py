from abc import ABC, abstractmethod

class FinancialState(ABC):
    @abstractmethod
    def get_recommendations(self, transactions):
        pass

class BudgetingState(FinancialState):
    def get_recommendations(self, transactions):
        return ["Focus on sticking to your budget", "Track all expenses"]

class SavingsState(FinancialState):
    def get_recommendations(self, transactions):
        return ["Increase your savings rate", "Look for high-yield savings accounts"]

class InvestmentState(FinancialState):
    def get_recommendations(self, transactions):
        return ["Consider diversifying your portfolio", "Review your asset allocation"] 