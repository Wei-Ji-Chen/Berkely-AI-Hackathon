from sqlalchemy import create_engine
from databases import Database
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlite3

database = Database("sqlite:///./database.db")

def initialize_db():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()

    create_table_query = """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            password TEXT
        );"""
    cursor.execute(create_table_query)

    create_table_query = """CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT,
            messages TEXT,
            created_timestamp TEXT,
            updated_timestamp TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );"""
    cursor.execute(create_table_query)


    create_table_query = """CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            text TEXT,
            created_timestamp TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );"""
    cursor.execute(create_table_query)

    create_table_query = """CREATE TABLE IF NOT EXISTS sessoins (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            created_timestamp TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );"""
    cursor.execute(create_table_query)

    create_table_query = """INSERT INTO users (email, password) VALUES ("sebbyzhao@berkeley.edu", "password");"""
    cursor.execute(create_table_query)
    
    connection.commit()
    cursor.close()
    connection.close()