from backend.database import database
from datetime import datetime

async def save_note(id: str, note: str, user_id: int):
    date = str(datetime.now())
    query = f"INSERT INTO notes (id, user_id, text, created_timestamp) VALUES (:id, :user_id, :text, :created_timestamp);"
    values = {"id": id, 'user_id': user_id, 'text': note, 'created_timestamp': date}
    res = await database.execute(query=query, values=values)

    return res