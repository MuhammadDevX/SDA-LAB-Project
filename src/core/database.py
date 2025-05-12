from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional

class DatabaseConnection:
    _instance: Optional['DatabaseConnection'] = None
    _engine = None
    _Session = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        if self._engine is None:
            self._engine = create_engine('sqlite:///finance.db')
            self._Session = sessionmaker(bind=self._engine)
            Base.metadata.create_all(self._engine)
    
    def get_session(self) -> Session:
        return self._Session()
    
    def get_engine(self):
        return self._engine

Base = declarative_base() 