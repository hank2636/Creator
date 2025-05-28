from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/pages",tags=["pages"])

@router.get("/home", response_class=HTMLResponse)
async def home():
    home_data = {
        
    }
    return "<h1>Welcome to My pages!</h1><p>This is the media.</p>"