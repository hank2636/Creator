from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter()

@router.get("/", response_class=HTMLResponse, tags=["root"], name="root page")
async def read_root():
    return "<h1>Welcome to My Site!</h1><p>This is the homepage.</p>"