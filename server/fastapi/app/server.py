from fastapi import FastAPI

# Create an instance of the FastAPI class
app = FastAPI()


@app.get("/hello")
async def get_hello():
    return {"message": "FastAPI server works"}
