from fastapi import APIRouter, HTTPException
from model.model import RegisterUser,LoginUser
from db.database import user_collection
from auth.hash import hash_password, verify_password,create_access_token
from datetime import timedelta

router = APIRouter(tags=["auth"])

@router.post("/auth/register")
def register(user:RegisterUser):
    # # Check the user if exist or not
    existing_user = user_collection.find_one({"email":user.email})
    
    if existing_user:
        return HTTPException(status_code=400, detail="User already exist")
    else:
        if user.password !=user.repeat_password:
            return HTTPException(status_code=400, detail="Password does not match")
        
        # Hash the password
        new_user = {
            "email":user.email,
            "username":user.username,
            "password":hash_password(user.password)
        }
        user_collection.insert_one(dict(new_user))
        return {"message": "User registered successfully", "status": 200}
    

@router.post("/auth/login")
def login(user: LoginUser):
    existing_user = user_collection.find_one({"email": user.email})

    if not existing_user or not verify_password(user.password, existing_user['password']):
        raise HTTPException(status_code=400, detail="Invalid Credentials")

    access_token = create_access_token(data={"email": existing_user['email']}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer", "status": 200}