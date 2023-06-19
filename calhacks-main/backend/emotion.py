import base64
import asyncio
from typing import List, Optional
from backend.config import HUME_API_KEY
from hume import BatchJobStatus, HumeBatchClient, HumeStreamClient
from hume._stream.stream_socket import json
from hume.models.config import ProsodyConfig, LanguageConfig



async def hume_emotions(path: str, text: Optional[str] = None, count: int = 3) -> List[str]:
    """
    Returns a list of the top `count` emotions in the audio.

    Parameters:

    - `audio`: The audio to analyze.
    - `text`: The text to analyze. If not provided, the audio will be transcribed.
    - `count`: The number of emotions to return. Defaults to 3.
    """
    # audio = base64.b64encode(audio)
    # client = HumeStreamClient(HUME_KEY)
    client = HumeBatchClient(HUME_API_KEY)
    config = LanguageConfig()
    config = ProsodyConfig()
    try:
        job = client.submit_job([], [config], files=[path])

        while job.get_status() in [BatchJobStatus.IN_PROGRESS, BatchJobStatus.QUEUED]:
            await asyncio.sleep(0.05)

        predictions = job.get_predictions()
        weighted_emotions = get_weighted_emotions(predictions[0])
        weighted_emotions = list(weighted_emotions.items())
        weighted_emotions.sort(key=lambda x: x[1], reverse=True)

        top_emotions = [x[0] for x in weighted_emotions[:3]]
        return top_emotions
    except Exception as e:
        print("Hume failed", e)
        return []



def get_weighted_emotions(res):
    if "errors" in res["results"] and len(res["results"]["errors"]) > 0:
        print("Hume errors", res["results"]["errors"])
        return {}

    predictions = res["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][0]["predictions"]
    emotions = {}
    for prediction in predictions:
        diff = prediction["time"]["end"] - prediction["time"]["begin"]
        for emotion in prediction["emotions"]:
            emotions[emotion["name"]] = emotions.get(
                emotion["name"], 0) + (emotion["score"] * diff)

    return emotions
