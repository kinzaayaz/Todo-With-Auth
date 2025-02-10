from fastapi import APIRouter, HTTPException,Depends
from db.database import user_collection,todo_collection
from schema.schema import list_serlarizer
from model.model import CreateTodo, UpdateTodo
from auth.hash import get_current_user
from bson import ObjectId

router = APIRouter(tags=["todos"])

# Home route
@router.get("/")
def home():
    return {"Message":"Welcome to the Todo API"}

# Get all todos
@router.get("/get_todos")
def get_todos(dict =Depends(get_current_user)):
    todos =  list_serlarizer(todo_collection.find())
    
    return todos

# Get todo by id
@router.get("/todos/{id}")
def get_by_id(id:str,dict =Depends(get_current_user)):
    try:
        todo =todo_collection.find_one({"_id":ObjectId(id)})
        print(todo)
        return {
            "id":str(todo["_id"]),
            "title":todo["title"],
            "description":todo["description"],
            "complete":todo["complete"]
        }
    except:
        return HTTPException(status_code=404, detail="Todo not found")

# Create a todo
@router.post("/create_todo")
def create_todo(todo:CreateTodo,dict =Depends(get_current_user)):
    try:
        todo_collection.insert_one(todo.dict())
        return {"Success":f"{todo.dict()}","status":200}
    except:
        return HTTPException(status_code=400, detail="Failed to create todo")

# Update a todo
@router.put("/update/{id}")
def update_todo(id:str,new_todo:UpdateTodo,dict = Depends(get_current_user)):
    # find the collection first if exist then update it
    todo = todo_collection.find_one({"_id":ObjectId(id)})
    if not todo:
        return HTTPException(status_code=404, detail="Todo not found")
    
    update_todo ={
        "title":new_todo.title if new_todo.title is not None else todo["title"],
        "description":new_todo.description if new_todo.description is not None else todo["description"],
        "complete":new_todo.complete if new_todo.complete is not None else todo["complete"]
    }

    # now update the todo
    todo_collection.find_one_and_update({"_id":ObjectId(id)},{"$set":dict(update_todo)})
    return {"Success":"Todo Updated","status":200}


# Delete a todo
@router.delete("/delete/{id}")
def delete_todo(id,dict = Depends(get_current_user)):
    # find the collection first if exist then delete it
    todo = todo_collection.find_one({"_id":ObjectId(id)})
    if todo:
        todo_collection.delete_one({"_id":ObjectId(id)})
        return {"Success":"Todo Deleted","status":200}
    else:
        return HTTPException(status_code=404, detail="Todo not found")