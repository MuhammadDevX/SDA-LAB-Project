from flask import Blueprint, request, jsonify
from models.goal import Goal
from models.database import db
from datetime import datetime

goals_bp = Blueprint('goals', __name__)

@goals_bp.route('/', methods=['GET'])
def get_goals():
    goals = Goal.query.all()
    return jsonify([
        {
            'id': g.id,
            'name': g.name,
            'target_amount': g.target_amount,
            'current_amount': g.current_amount,
            'deadline': g.deadline.date().isoformat(),
            'created_at': g.created_at.isoformat()
        } for g in goals
    ])

@goals_bp.route('/', methods=['POST'])
def add_goal():
    data = request.json
    goal = Goal(
        name=data['name'],
        target_amount=data['target_amount'],
        current_amount=data.get('current_amount', 0.0),
        deadline=datetime.fromisoformat(data['deadline'])
    )
    db.session.add(goal)
    db.session.commit()
    return jsonify({'id': goal.id}), 201

@goals_bp.route('/<int:goal_id>', methods=['PATCH'])
def update_goal(goal_id):
    data = request.json
    goal = Goal.query.get(goal_id)
    if not goal:
        return jsonify({'error': 'Goal not found'}), 404
    amount = data.get('amount', 0)
    goal.update_progress(amount)
    db.session.commit()
    return jsonify({'id': goal.id, 'current_amount': goal.current_amount}) 