from PyQt6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
                            QPushButton, QTableWidget, QTableWidgetItem,
                            QLineEdit, QComboBox, QDateEdit)
from PyQt6.QtCore import Qt, QDate

class TransactionsWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout(self)
        
        # Header
        header = QLabel("Transactions")
        header.setStyleSheet("font-size: 24px; font-weight: bold;")
        layout.addWidget(header)
        
        # Add transaction form
        form_layout = QHBoxLayout()
        self.add_transaction_form(form_layout)
        layout.addLayout(form_layout)
        
        # Transactions table
        self.transactions_table = QTableWidget()
        self.transactions_table.setColumnCount(5)
        self.transactions_table.setHorizontalHeaderLabels([
            "Date", "Description", "Category", "Amount", "Account"
        ])
        layout.addWidget(self.transactions_table)
    
    def add_transaction_form(self, layout):
        # Date
        self.date_edit = QDateEdit()
        self.date_edit.setDate(QDate.currentDate())
        layout.addWidget(self.date_edit)
        
        # Description
        self.description_edit = QLineEdit()
        self.description_edit.setPlaceholderText("Description")
        layout.addWidget(self.description_edit)
        
        # Category
        self.category_combo = QComboBox()
        self.category_combo.addItems(["Income", "Expense", "Investment", "Savings"])
        layout.addWidget(self.category_combo)
        
        # Amount
        self.amount_edit = QLineEdit()
        self.amount_edit.setPlaceholderText("Amount")
        layout.addWidget(self.amount_edit)
        
        # Add button
        add_button = QPushButton("Add Transaction")
        add_button.clicked.connect(self.add_transaction)
        layout.addWidget(add_button)
    
    def add_transaction(self):
        # Add transaction logic here
        pass 