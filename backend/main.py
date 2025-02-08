from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.todo_routes import router as todo_router
from routes.auth_routes import router as auth_router

app = FastAPI(
    title="Todo API",
    description="A simple Todo API",
    version="1.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, you can specify a list e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods: GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allow all headers
)

# Include Routers
app.include_router(todo_router)
app.include_router(auth_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
