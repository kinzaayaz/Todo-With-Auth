from pydantic import BaseModel
from typing import List, Optional

class RegisterUser(BaseModel):
    username: str
    email: str
    password:str
    repeat_password:str


class LoginUser(BaseModel):
    email: str
    password: str

class CreateTodo(BaseModel):
    title: str
    description: str
    complete: bool

class UpdateTodo(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    complete: Optional[bool]= False