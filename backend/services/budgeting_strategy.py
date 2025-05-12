from abc import ABC, abstractmethod

class BudgetingStrategy(ABC):
    @abstractmethod
    def calculate_budget(self, income: float) -> dict:
        pass

class ZeroBasedBudgeting(BudgetingStrategy):
    def calculate_budget(self, income: float) -> dict:
        return {
            'needs': income * 0.5,
            'wants': income * 0.3,
            'savings': income * 0.2
        }

class FiftyThirtyTwenty(BudgetingStrategy):
    def calculate_budget(self, income: float) -> dict:
        return {
            'needs': income * 0.5,
            'wants': income * 0.3,
            'savings': income * 0.2
        } 