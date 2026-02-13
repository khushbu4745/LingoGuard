from fastapi import FastAPI
from routers import modules, progress, ai_help
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="German Learning MVP API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(modules.router, prefix="/api/modules", tags=["modules"])
app.include_router(progress.router, prefix="/api/progress", tags=["progress"])
app.include_router(ai_help.router)