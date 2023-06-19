from backend.utils.audio_processing import speech_to_text, save_as_file
from backend.data import DATA_DIR
import os
import pickle


def test_speech_to_text():
    simple_audio_path = os.path.join(DATA_DIR, "test_30_sec.mp3") 
    with open(simple_audio_path, "rb") as f:
        simple_audio = f.read()

    #path = save_as_file(simple_audio)
    # This test needs to be fixed to account for new thing.
    #transcript = speech_to_text(path)
    #assert transcript != ""


