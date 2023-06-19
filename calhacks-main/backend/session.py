import datetime
import uuid
from backend.database import *

async def create_session(user_id: str):
    id = str(uuid.uuid4())
    query = "INSERT INTO sessoins (id, user_id, created_timestamp) VALUES (:id, :user_id, :created_timestamp)"

    values = {
        "id": id,
        "user_id": user_id,
        "created_timestamp": str(datetime.datetime.now())
    }

    await database.execute(query=query, values=values)
    return id

async def get_current_user_id(session_id: str):
    query = "SELECT user_id FROM sessoins WHERE id = :session_id"
    values = {"session_id": session_id}
    resp = await database.fetch_one(query=query, values=values)
    return resp[0]