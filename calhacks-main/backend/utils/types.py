from dataclasses import dataclass
import json
from typing import List, Literal


@dataclass
class Message:
    role: Literal["system", "user", "assistant"]
    content: str
    emotions: List[str]
    notes: List[str]
    kind: Literal["main", "reasoning"]

    def dict(self):
        return {
            "role": self.role,
            "content": self.content,
            "emotions": self.emotions,
            "notes": self.notes,
            "kind": self.kind
        }



@dataclass
class Note:
    id: str
    text: str


@dataclass
class ChatSession:
    id: str
    title: str
    messages: List[Message]
    created_timestamp: int
    updated_timestamp: int
