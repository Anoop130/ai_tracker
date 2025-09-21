from pydantic import BaseModel
from typing import List, Optional


class MealLogBase(BaseModel):
    food: str
    servings: float
    calories: float
    protein: float
    carbs: float
    fiber: float
    fat: float

class MealLog(MealLogBase):
    class Config:
        orm_mode = True

class User(BaseModel):
    name: str
    email: str
    password: str

class ShowUser(BaseModel):
    name: str
    email: str

class ShowMealLog(BaseModel):
    food: str
    servings: float
    calories: float
    protein: float
    carbs: float
    fiber: float
    fat: float
    user: ShowUser

    class Config:
        orm_mode = True

class Login(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None