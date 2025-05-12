from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Singleton pattern for DB connection is handled by Flask-SQLAlchemy

def init_db():
    from .account import Account
    from .transaction import Transaction
    from .goal import Goal
    db.create_all() 