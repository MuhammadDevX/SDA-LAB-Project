from flask import Blueprint, request, jsonify
from services.categorization_service import TransactionCategorizationService
from models.transaction import Transaction

categorize_bp = Blueprint('categorize', __name__)
categorizer = TransactionCategorizationService()

@categorize_bp.route('/', methods=['POST'])
def categorize_transaction():
    data = request.json
    description = data.get('description', '')
    # Train on all transactions
    from models.database import db
    categorizer.train(Transaction.query.all())
    category = categorizer.categorize(description)
    return jsonify({'category': category}) 