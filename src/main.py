import sys
from PyQt6.QtWidgets import QApplication
from gui.main_window import MainWindow
from core.database import DatabaseConnection

def main():
    # Initialize database
    db = DatabaseConnection()
    
    # Create application
    app = QApplication(sys.argv)
    
    # Create and show main window
    window = MainWindow()
    window.show()
    
    # Start event loop
    sys.exit(app.exec())

if __name__ == "__main__":
    main() 