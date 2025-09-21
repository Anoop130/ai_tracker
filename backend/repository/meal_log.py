from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from .. import schemas, database, models



def get_all(db: Session):
    meal_logs = db.query(models.MealLog).all()
    return meal_logs


def create(request: schemas.MealLog, db: Session):
    new_meal_log = models.MealLog(
        food=request.food, 
        servings=request.servings,
        calories=request.calories,
        protein=request.protein,
        carbs=request.carbs,
        fiber=request.fiber,
        fat=request.fat,
        user_id=1
    )
    db.add(new_meal_log)
    db.commit()
    db.refresh(new_meal_log)
    return new_meal_log


def destroy(id, db: Session):
    meal_log = db.query(models.MealLog).filter(models.MealLog.id == id)
    if not meal_log.first():
        raise HTTPException(status_code=404, detail=f"Meal log with the id {id} is not available")
    meal_log.delete(synchronize_session=False)
    db.commit()
    return "done" 


def update(id, request: schemas.MealLog, db: Session):
    meal_log = db.query(models.MealLog).filter(models.MealLog.id == id)
    if not meal_log.first():
        raise HTTPException(status_code=404, detail=f"Meal log with the id {id} is not available")
    meal_log.update(request.dict())
    db.commit()
    return "updated"

def show(id, db: Session):
    meal_log = db.query(models.MealLog).filter(models.MealLog.id == id).first()
    if not meal_log:
        raise HTTPException(status_code=404, detail=f"Meal log with the id {id} is not available")
    return meal_log
