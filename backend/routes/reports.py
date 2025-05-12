from flask import Blueprint, jsonify
from models.transaction import Transaction
from services.reporting_service import ReportingService

reports_bp = Blueprint('reports', __name__)

@reports_bp.route('/spending', methods=['GET'])
def spending_report():
    transactions = Transaction.query.all()
    service = ReportingService()
    data = service.generate_spending_report(transactions)
    return jsonify({'spending': data})

@reports_bp.route('/income_vs_expenses', methods=['GET'])
def income_vs_expenses_report():
    transactions = Transaction.query.all()
    service = ReportingService()
    data = service.generate_income_vs_expenses(transactions)
    return jsonify({'income_vs_expenses': data}) 