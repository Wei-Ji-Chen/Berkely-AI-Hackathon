def take_note(note: str):
    pass


openai_functions = [
    {
        "name": "take_note",
        "description": "Take notes on the users emotion, state of being, and other things for future reference.",
        "parameters": {
            "type": "object",
            "properties": {
                "type": "string",
                "description": "The note to take."
            },
            "required": ["note"]
        }
    },
]

functions = {
    "take_note": take_note
}
