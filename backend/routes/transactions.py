from flask import Blueprint, request, jsonify
from models.transaction import Transaction
from models.account import Account
from models.database import db
from services.categorization_service import TransactionCategorizationService
from datetime import datetime

transactions_bp = Blueprint('transactions', __name__)
categorizer = TransactionCategorizationService()

@transactions_bp.route('/', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.order_by(Transaction.date.desc()).all()
    return jsonify([
        {
            'id': t.id,
            'amount': t.amount,
            'description': t.description,
            'category': t.category,
            'date': t.date.isoformat(),
            'account_id': t.account_id
        } for t in transactions
    ])

@transactions_bp.route('/', methods=['POST'])
def add_transaction():
    data = request.json
    account = Account.query.get(data['account_id'])
    if not account:
        return jsonify({'error': 'Account not found'}), 404
    # AI categorization if category not provided
    category = data.get('category')
    if not category:
        # Train categorizer on existing transactions
        categorizer.train(Transaction.query.all())
        category = categorizer.categorize(data['description'])
    # Parse date string to datetime
    date_str = data.get('date')
    date = datetime.fromisoformat(date_str) if date_str else None
    transaction = Transaction(
        amount=data['amount'],
        description=data['description'],
        category=category,
        date=date,
        account_id=account.id
    )
    db.session.add(transaction)
    account.add_transaction(transaction)
    db.session.commit()
    return jsonify({'id': transaction.id}), 201 