# Berkely-AI-Hackathon

Therapy on average costs between $60-$120 without insurance and for many, there’s still a stigma attached to needing help with mental health. mindflow presents itself as an AI therapist to help individuals in need at a no-cost option while preserving the privacy of their mental health.

Our special model serves as a mental health assistant, taking notes as you talk to it like a therapist would. Furthermore, unlike other chatbots, we consider the user's emotions present in their voice as part of the context of what they say. When you ask a new question or interact with mindflow, it retrieves the most relevant note it’s taken in the past and analyzes the user's emotions behind their speech to help it respond. This approach to a therapist-like interaction allows us to track mental health progress and provide better context to the assistant based upon what the user has previously said no matter how long ago!

Our project is built using next.js and FastAPI using OpenAI’s whisper and GPT-4 models for text-processing and chatting, Hume to analyze emotions, Microsoft for text-to-speech, and Pinecone for storing and retrieving relevant notes based on their embeddings.

Our note-taking system is novel and mimics a therapist, and allowing for speech allows for further immersion in a more human-like mental health assistant. Furthermore, mindflow takes into consideration the user's emotions while speaking, providing better context to what is said--pure text fails to capture a lot of meaning present in someone's voice

https://devpost.com/software/mindsflow
