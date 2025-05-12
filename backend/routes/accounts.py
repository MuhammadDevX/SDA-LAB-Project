from flask import Blueprint, request, jsonify
from models.account import Account, SavingsAccount, CheckingAccount, InvestmentAccount
from models.database import db

accounts_bp = Blueprint('accounts', __name__)

@accounts_bp.route('/', methods=['GET'])
def get_accounts():
    accounts = Account.query.all()
    return jsonify([
        {
            'id': acc.id,
            'name': acc.name,
            'balance': acc.balance,
            'type': acc.type
        } for acc in accounts
    ])

@accounts_bp.route('/', methods=['POST'])
def add_account():
    data = request.json
    acc_type = data.get('type', 'checking')
    if acc_type == 'savings':
        acc = SavingsAccount(name=data['name'], balance=data.get('balance', 0.0))
    elif acc_type == 'investment':
        acc = InvestmentAccount(name=data['name'], balance=data.get('balance', 0.0))
    else:
        acc = CheckingAccount(name=data['name'], balance=data.get('balance', 0.0))
    db.session.add(acc)
    db.session.commit()
    return jsonify({'id': acc.id, 'name': acc.name, 'balance': acc.balance, 'type': acc.type}), 201 