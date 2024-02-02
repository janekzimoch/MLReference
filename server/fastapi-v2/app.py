from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

from src.embedding_store import EmbeddingStore
import src.evaluation.evaluate as evaluator
from src.interfaces import Recommendation

load_dotenv()

model_name = "BAAI/bge-base-en-v1.5"
dataset = evaluator.load_dataset()
es = EmbeddingStore(model_name, data=dataset, batch_size=10, initialise=True)


app = FastAPI()

class SearchObject(BaseModel):
    text: str
    year: int = None
    conference: str = None

@app.get("/hello")
async def get_hello():
    return {"message": "FastAPI server works"}

@app.post("/app/search_papers")
async def search_papers(search_object: SearchObject):
    print(search_object)
    # note, year and conference filtering is not yet implemented
    recommendation: Recommendation = es.article_recommendations(search_object.text)
    return recommendation


