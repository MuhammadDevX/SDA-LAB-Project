from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pandas as pd

class TransactionCategorizationService:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.classifier = MultinomialNB()
        self.categories = ['income', 'expense', 'investment', 'savings']
        
    def train(self, transactions):
        descriptions = [t.description for t in transactions]
        categories = [t.category for t in transactions]
        
        X = self.vectorizer.fit_transform(descriptions)
        self.classifier.fit(X, categories)
    
    def categorize(self, description: str) -> str:
        X = self.vectorizer.transform([description])
        return self.classifier.predict(X)[0] 