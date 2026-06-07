from fastapi import FastAPI
from app.api.search_api import router as search_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Research Gap Analyzer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Research Gap Analyzer API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Register API routers
app.include_router(search_router)
