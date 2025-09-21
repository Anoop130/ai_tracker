from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
from .. import schemas, database, models, oauth2
from sqlalchemy.orm import Session
from ..repository import meal_log


router = APIRouter(
    tags=["meal_logs"],
    prefix="/meal_log"
)
get_db = database.get_db

@router.get("/", response_model=list[schemas.ShowMealLog])
def all(db: Session = Depends(get_db),  current_user: schemas.User = Depends(oauth2.get_current_user)):
    return meal_log.get_all(db)


@router.post("/", status_code=status.HTTP_201_CREATED)
def create(request: schemas.MealLog, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return meal_log.create(request, db)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def destroy(id, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return meal_log.destroy(id, db)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update(id, request: schemas.MealLog, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return meal_log.update(id, request, db)


@router.get("/{id}",  status_code=200, response_model=schemas.MealLog) 
def show(id,  db: Session = Depends(get_db), status_code=200, current_user: schemas.User = Depends(oauth2.get_current_user)):
    return meal_log.show(id, db)
