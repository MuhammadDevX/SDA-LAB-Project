from flask import Flask
from flask_cors import CORS
from config import Config
from models.database import db, init_db
from routes.accounts import accounts_bp
from routes.transactions import transactions_bp
from routes.goals import goals_bp
from routes.categorize import categorize_bp
from routes.recommendations import recommendations_bp, ai_bp
from routes.reports import reports_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    with app.app_context():
        init_db()
    # Register blueprints
    app.register_blueprint(accounts_bp, url_prefix='/api/accounts')
    app.register_blueprint(transactions_bp, url_prefix='/api/transactions')
    app.register_blueprint(goals_bp, url_prefix='/api/goals')
    app.register_blueprint(categorize_bp, url_prefix='/api/categorize')
    app.register_blueprint(recommendations_bp, url_prefix='/api/recommendations')
    app.register_blueprint(reports_bp, url_prefix='/api/reports')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 