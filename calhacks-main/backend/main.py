from fastapi import FastAPI, Request, Response
import openai
import uvicorn
from backend.database import *
from backend.emotion import *
from backend.prompt import INITIAL_MESSAGE
from backend.utils.audio_processing import speech_to_text, save_as_file, text_to_speech
from backend.utils.types import Message
import datetime
from backend.prompt_builder import PromptBuilder
from backend.embeddings import Pinecone
from backend.utils.message_utils import process_json_strs
from backend.session import create_session, get_current_user_id

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from backend import config

class Login(BaseModel):
    email: str
    password: str

class NotesCreate(BaseModel):
    text: str


class ResponseCreate(BaseModel):
    text: str
    conversation_id: int
    audio: str

app = FastAPI()
pinecone = Pinecone('mindflow')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    initialize_db()
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get('/v1/users')
async def get_users():
    users = await database.fetch_all(query="SELECT * FROM users;")
    return users

@app.post('/v1/notes')
async def create_notes(request: NotesCreate):
    query = f"INSERT INTO notes (text) VALUES ({request.text})"
    resp = await database.execute(query=query)
    return resp


@app.post("/v1/conversation")
async def create_conversation(request: Request):
    session_id = request.cookies.get("session")
    initial = Message(
        content=INITIAL_MESSAGE,
        role="assistant",
        emotions=[],
        notes=[],
        kind="main"
    )
    
    query = "INSERT INTO conversations (user_id, title, messages, created_timestamp, updated_timestamp) VALUES (:user_id, :title, :messages, :created_timestamp, :updated_timestamp)"
    values = {
        "user_id": await get_current_user_id(session_id),
        "title": "Untitled",
        "created_timestamp": str(datetime.datetime.now()),
        "updated_timestamp": str(datetime.datetime.now()),
        "messages": json.dumps([initial.dict()]),
    }

    result = await database.execute(query=query, values=values)
    audio = text_to_speech(INITIAL_MESSAGE, "audio.wav")
    
    return {
        "conversation_id": result,
        "messages": [initial.dict()],
        "audio": audio
    }


@app.delete('/v1/conversation/{id}')
async def delete_conversation(request: Request, id: int):
    query = f"DELETE FROM conversations WHERE id = {id}"
    resp = await database.execute(query=query)
    return resp


@app.post('/v1/response')
async def get_response(data: ResponseCreate, req: Request):
    session_id = req.cookies.get("session")
    user_id = await get_current_user_id(session_id)
    text = ""
    conversation_id = data.conversation_id
    audio = data.audio
    # Save audio as file
    
    path = await save_as_file(audio)
    
    # Pass off to hume stuff.
    top_emotions = await hume_emotions(path, text)

    # Fetch previous messages and new message.
    msgs = await database.fetch_one(query=f"SELECT messages FROM conversations WHERE conversations.id={conversation_id};")
    msgs = msgs[0]
    transcript = await speech_to_text(path)

    
    # FIXME: Handle exception when no rows
    # FIXME: Use json.loads() to get msgs to json then to dic.
    processed_msgs = process_json_strs(msgs)
    # breakpoint()
    # Create prompt builder.
    prompt_builder = PromptBuilder(user_id, processed_msgs, conversation_id, model='gpt-4', embeddings=pinecone)

    # Generate response.
    final = await prompt_builder.response(transcript, top_emotions)
    audio = text_to_speech(final, "audio.wav")

    print(json.dumps(list(map(lambda x: x.dict(), prompt_builder.messages)), indent=4))
    return {
        "messages": [msg.dict() for msg in prompt_builder.messages if msg.kind == "main"],
        "audio": audio,
    }

@app.post("/v1/login")
async def login(request: Login, response: Response):
    # This should be salted and hashed but time :(
    query = "SELECT id FROM users WHERE email = :email AND password = :password;"
    params = {"email": request.email, "password": request.password}
    resp = await database.fetch_one(query=query, values=params)

    if resp is None:
        return {"error": "Invalid email or password."}

    session = await create_session(resp[0])
    response.set_cookie(key="session", value=session)

    return {"success": True}

@app.post("/v1/signup")
async def signup(request: Login, response: Response):
    query = "INSERT INTO users (email, password) VALUES (:email, :password);"
    params = {"email": request.email, "password": request.password}
    await database.execute(query=query, values=params)

    query = "SELECT id FROM users WHERE email = :email AND password = :password;"
    resp = await database.fetch_one(query=query, values=params)
    session = await create_session(resp[0])
    print(resp)
    response.set_cookie(key="session", value=session)

    return {"success": True}

@app.post("/v1/logout")
async def logout(response: Response):
    response.delete_cookie(key="session")
    return {"success": True}

if __name__ == "__main__":
    openai.api_key = config.OPENAI_API_KEY
    
    uvicorn.run(app, host="localhost", port=8000)

