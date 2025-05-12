from PyQt6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
                            QFrame, QPushButton)
from PyQt6.QtCore import Qt
import matplotlib.pyplot as plt
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas

class DashboardWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout(self)
        
        # Header
        header = QLabel("Dashboard")
        header.setStyleSheet("font-size: 24px; font-weight: bold;")
        layout.addWidget(header)
        
        # Summary cards
        summary_layout = QHBoxLayout()
        self.add_summary_card(summary_layout, "Total Balance", "$10,000")
        self.add_summary_card(summary_layout, "Monthly Income", "$3,000")
        self.add_summary_card(summary_layout, "Monthly Expenses", "$2,000")
        layout.addLayout(summary_layout)
        
        # Charts
        charts_layout = QHBoxLayout()
        self.add_chart(charts_layout, "Spending by Category")
        self.add_chart(charts_layout, "Income vs Expenses")
        layout.addLayout(charts_layout)
        
        # Recent transactions
        self.add_recent_transactions(layout)
    
    def add_summary_card(self, layout, title, value):
        card = QFrame()
        card.setStyleSheet("""
            QFrame {
                background-color: white;
                border-radius: 8px;
                padding: 16px;
            }
        """)
        card_layout = QVBoxLayout(card)
        
        title_label = QLabel(title)
        title_label.setStyleSheet("color: #7f8c8d;")
        value_label = QLabel(value)
        value_label.setStyleSheet("font-size: 24px; font-weight: bold;")
        
        card_layout.addWidget(title_label)
        card_layout.addWidget(value_label)
        layout.addWidget(card)
    
    def add_chart(self, layout, title):
        frame = QFrame()
        frame.setStyleSheet("""
            QFrame {
                background-color: white;
                border-radius: 8px;
                padding: 16px;
            }
        """)
        frame_layout = QVBoxLayout(frame)
        
        # Create matplotlib figure
        fig, ax = plt.subplots()
        canvas = FigureCanvas(fig)
        frame_layout.addWidget(canvas)
        
        layout.addWidget(frame)
    
    def add_recent_transactions(self, layout):
        frame = QFrame()
        frame.setStyleSheet("""
            QFrame {
                background-color: white;
                border-radius: 8px;
                padding: 16px;
            }
        """)
        frame_layout = QVBoxLayout(frame)
        
        header = QLabel("Recent Transactions")
        header.setStyleSheet("font-size: 18px; font-weight: bold;")
        frame_layout.addWidget(header)
        
        # Add transaction list here
        
        layout.addWidget(frame) 