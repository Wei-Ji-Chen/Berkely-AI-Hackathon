import asyncio
import re
import uuid
import openai
import random
from typing import Any, Dict, List, Optional
from sqlalchemy.sql import text

from dataclasses import asdict
from backend.database import *
from backend.embeddings import Pinecone
from backend.emotion import hume_emotions
from backend.utils.types import ChatSession, Message, Note
from backend.utils.note_utils import save_note
import backend.prompt as prompt
import json


class PromptBuilder:
    def __init__(
        self,
        user_id: str,
        msgs: List[Message],
        conversation_id: int,
        model: str = "gpt-4",
        embeddings: Optional[Pinecone] = None
    ):
        self.system_message = prompt.SYSTEM_MESSAGE
        self.prompt_template = prompt.PROMPT_TEMPLATE
        self.model = model
        self.messages = msgs
        self.embeddings = embeddings
        self.user_id = user_id
        self.conversation_id = conversation_id

    def _extract_parts(self, res: str):
        regex = r"Thought:((?:.|\s)+?)Notes:((?:.|\s)+?)Response:((?:.|\s)+)"
        result = re.search(regex, res)
        if result is None:
            return None

        thought = result.group(1).strip()
        notes = result.group(2).strip()
        response = result.group(3).strip()

        if thought == "" or notes == "" or response == "":
            return None

        return thought, notes, response

    async def _relevant_notes(self, query: str) -> str:
        if self.embeddings is None:
            print("PromptBuilder.embeddings is none")
            return ""

        filter = {"user_id": {"$eq": self.user_id}}
        matches = self.embeddings.get_similar(query, 1, filter)

        if len(matches) == 0:
            return ""

        notes = []
        for id in matches:
            query = "SELECT text FROM notes WHERE id = :id"
            note = await database.fetch_one(query=query, values={"id": id})
            note = note[0]
            if note is None:
                continue

            notes.append(note)

        print(notes)
        return notes

    def _build_conversation(self, messages: List[Message], query: str, emotions: List[str]) -> str:
        emotions_str = ", ".join(emotions)[:-2]
        conversation = ""
        for message in messages:
            if message.kind != "main":
                continue

            if message.role == "assistant":
                conversation += "Therapist: "
            elif message.role == "user":
                conversation += "User: "

            conversation += message.content
            conversation += "\n\n"

        conversation += "User: "
        if len(emotions) > 0:
            conversation += f"(Feeling {emotions_str}) "

        conversation += query
        return conversation

    def _build_prompt(self, relevant_notes: List[str], conversation: str):
        relevant_notes = "\n".join(relevant_notes)
        return self.prompt_template.format(relevant_notes=relevant_notes, conversation=conversation)

    async def _query_llm(self, messages: List[Message], query: str, emotions: List[str]) -> Any:
        relevant_notes = await self._relevant_notes(query)
        conversation = self._build_conversation(messages, query, emotions)
        prompt = self._build_prompt(relevant_notes, conversation)
        prompt_msgs = [
            {"role": "system", "content": self.system_message},
            {"role": "user", "content": prompt},
        ]
        
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=prompt_msgs,
        )

        return prompt, response

    # async def think_until_response(self, query: str, emotions: List[str]) -> str:
        # pass
    async def _save_note(self, note: str):
        id = str(uuid.uuid4())
        res = await save_note(id, note, self.user_id)
        print(res)

        if self.embeddings is None:
            return

        self.embeddings.store(id, note, {"user_id": self.user_id})

    async def response(self, query: str, emotions: List[str]):
        parts = None
        llm_res = ""
        while parts is None:
            llm_prompt, llm_res = await self._query_llm(self.messages, query, emotions)
            llm_res = llm_res['choices'][0]['message']['content']
            parts = self._extract_parts(llm_res)

        notes = parts[1]
        response = parts[2]
        await self._save_note(notes)

        #FIXME: Save these to db
        self.messages.append(Message(
            content=query,
            role="user",
            kind="main",
            emotions=emotions,
            notes=[notes],
        ))

        self.messages.append(Message(
            content=llm_prompt + "\n\n" + llm_res,
            role="assistant",
            kind="reasoning",
            emotions=emotions,
            notes=[],
        ))

        self.messages.append(Message(
            content=response,
            role="assistant",
            kind="main",
            emotions=[],
            notes=[],
        ))

        query = f"UPDATE conversations SET messages={self.messages} WHERE conversations.id = {self.conversation_id};"
        messages = [asdict(message) for message in self.messages]
        # Save these to conversation and switch out messages.
        await database.execute(query = f"UPDATE conversations SET messages = :msgs  WHERE conversations.id = {self.conversation_id};", values={"msgs": json.dumps(messages)})

        return response


# pinecone = Pinecone("mindflow")
# builder = PromptBuilder("1", [], embeddings=pinecone)

# res = asyncio.run(builder.response("How can you help me?", ["Anxiety"]))
# print(res)
