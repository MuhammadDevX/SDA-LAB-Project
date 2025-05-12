from flask import Blueprint, jsonify, request
from models.transaction import Transaction
from services.recommendation_service import RecommendationService
from services.financial_state import BudgetingState, SavingsState, InvestmentState
import numpy as np
import os
from openai import OpenAI
from dotenv import load_dotenv
recommendations_bp = Blueprint('recommendations', __name__)
ai_bp = Blueprint('ai', __name__)

@recommendations_bp.route('/', methods=['GET'])
def get_recommendations():
    mode = request.args.get('mode', 'budgeting')
    transactions = Transaction.query.all()
    rec_service = RecommendationService()
    recs = rec_service.analyze_spending(transactions)
    # State pattern for additional recommendations
    if mode == 'savings':
        state = SavingsState()
    elif mode == 'investment':
        state = InvestmentState()
    else:
        state = BudgetingState()
    recs += state.get_recommendations(transactions)
    return jsonify({'recommendations': recs})

@ai_bp.route('/expense_guide', methods=['GET'])
def ai_expense_guide():
    transactions = Transaction.query.all()
    if not transactions:
        return jsonify({'advice': ["No transactions to analyze."]})
    # AI: Compare user's spending in each category to the average
    amounts = [abs(t.amount) for t in transactions if t.amount < 0]
    if not amounts:
        return jsonify({'advice': ["No expenses to analyze."]})
    avg_expense = np.mean(amounts)
    by_category = {}
    for t in transactions:
        if t.amount < 0:
            by_category.setdefault(t.category, []).append(abs(t.amount))
    advice = []
    for cat, vals in by_category.items():
        cat_avg = np.mean(vals)
        if cat_avg > avg_expense * 1.2:
            advice.append(f"You are spending more than average on {cat}. Consider reducing it by 20%.")
        elif cat_avg < avg_expense * 0.5:
            advice.append(f"Your spending on {cat} is well below average. Good job!")
    if not advice:
        advice.append("Your spending is balanced across categories.")
    return jsonify({'advice': advice})

@ai_bp.route('/chat', methods=['POST'])
def ai_chat():
    data = request.json
    user_message = data.get('message', '')
    transactions = Transaction.query.all()
    # Summarize transactions for context
    tx_summary = '\n'.join([
        f"{t.date.date().isoformat()}: {t.description} ({t.category}) {t.amount}" for t in transactions
    ])
    prompt = f"""
You are a helpful personal finance assistant. The user will ask you questions about their finances. Here are their recent transactions:
{tx_summary}

User: {user_message}
AI: """
    # Gemini API
    load_dotenv(override=True)
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return jsonify({'reply': 'Gemini API key not set on server.'}), 500
    openai = OpenAI(
    api_key=api_key, 
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
    model = openai.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "system", "content": "You are a helpful personal finance assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    try:
        response = model.choices[0].message.content
        reply = response
    except Exception as e:
        reply = f"Sorry, I could not process your request. ({e})"
    return jsonify({'reply': reply}) 