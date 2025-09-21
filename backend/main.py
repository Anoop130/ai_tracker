from fastapi import FastAPI
from uvicorn import run
from . import schemas, models
from .database import engine
from .routers import meal_log, user, authentication

app = FastAPI()


models.Base.metadata.create_all(engine)


app.include_router(authentication.router)
app.include_router(meal_log.router)
app.include_router(user.router)


if __name__ == "__main__":
    run(app, host="127.0.0.1", port=9000)