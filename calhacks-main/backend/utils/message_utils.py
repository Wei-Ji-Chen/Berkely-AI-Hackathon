from backend.database import database
from datetime import datetime
from backend.utils.types import Message
import json

async def update_conversation(messages, conversation_id):

    query = f"UPDATE conversations SET messages={messages} WHERE conversations.id = {conversation_id}" #FIXME:
    await database.execute(query=query)

    return

def process_json_strs(json_strs):
    if json_strs is None:
        return []
    json_strs = json.loads(json_strs)


    messages = []
    for dic in json_strs:
        messages.append(Message(**dic))
    return messages