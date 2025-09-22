from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
from . import schemas, models
from .database import engine
from .routers import meal_log, user, authentication

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for debugging
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(meal_log.router)
app.include_router(user.router)

if __name__ == "__main__":
    run(app, host="127.0.0.1", port=9000)