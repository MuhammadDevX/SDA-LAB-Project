from .database import db
from datetime import datetime

class Goal(db.Model):
    __tablename__ = 'goals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, default=0.0)
    deadline = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def calculate_progress(self):
        return (self.current_amount / self.target_amount) * 100 if self.target_amount else 0
    def update_progress(self, amount):
        self.current_amount += amount
        return self.calculate_progress() 