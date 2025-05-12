from PyQt6.QtWidgets import (QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, 
                            QPushButton, QLabel, QStackedWidget, QTableWidget, 
                            QTableWidgetItem, QComboBox, QLineEdit, QMessageBox)
from PyQt6.QtCore import Qt
from PyQt6.QtGui import QFont, QIcon
from .dashboard_widget import DashboardWidget
from .transactions_widget import TransactionsWidget
from .goals_widget import GoalsWidget
from .reports_widget import ReportsWidget

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Personal Finance Management System")
        self.setMinimumSize(1200, 800)
        
        # Create main widget and layout
        main_widget = QWidget()
        self.setCentralWidget(main_widget)
        layout = QHBoxLayout(main_widget)
        
        # Create sidebar
        sidebar = self.create_sidebar()
        layout.addWidget(sidebar)
        
        # Create main content area
        self.content_area = QStackedWidget()
        layout.addWidget(self.content_area)
        
        # Add widgets to content area
        self.dashboard = DashboardWidget()
        self.transactions = TransactionsWidget()
        self.goals = GoalsWidget()
        self.reports = ReportsWidget()
        
        self.content_area.addWidget(self.dashboard)
        self.content_area.addWidget(self.transactions)
        self.content_area.addWidget(self.goals)
        self.content_area.addWidget(self.reports)
        
        # Set initial page
        self.content_area.setCurrentWidget(self.dashboard)
        
        # Apply styles
        self.apply_styles()
    
    def create_sidebar(self):
        sidebar = QWidget()
        sidebar.setFixedWidth(200)
        sidebar.setStyleSheet("background-color: #2c3e50;")
        layout = QVBoxLayout(sidebar)
        
        # Add logo/title
        title = QLabel("PFMS")
        title.setStyleSheet("color: white; font-size: 24px; font-weight: bold;")
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(title)
        
        # Add navigation buttons
        nav_buttons = [
            ("Dashboard", self.show_dashboard),
            ("Transactions", self.show_transactions),
            ("Goals", self.show_goals),
            ("Reports", self.show_reports)
        ]
        
        for text, callback in nav_buttons:
            btn = QPushButton(text)
            btn.setStyleSheet("""
                QPushButton {
                    color: white;
                    border: none;
                    padding: 10px;
                    text-align: left;
                    font-size: 14px;
                }
                QPushButton:hover {
                    background-color: #34495e;
                }
            """)
            btn.clicked.connect(callback)
            layout.addWidget(btn)
        
        layout.addStretch()
        return sidebar
    
    def show_dashboard(self):
        self.content_area.setCurrentWidget(self.dashboard)
    
    def show_transactions(self):
        self.content_area.setCurrentWidget(self.transactions)
    
    def show_goals(self):
        self.content_area.setCurrentWidget(self.goals)
    
    def show_reports(self):
        self.content_area.setCurrentWidget(self.reports)
    
    def apply_styles(self):
        self.setStyleSheet("""
            QMainWindow {
                background-color: #f5f6fa;
            }
            QLabel {
                color: #2c3e50;
            }
            QPushButton {
                background-color: #3498db;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
            }
            QPushButton:hover {
                background-color: #2980b9;
            }
        """) 