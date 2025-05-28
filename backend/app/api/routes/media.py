from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/media", tags=["media"])

@router.get("/", response_class=HTMLResponse)
async def read_root():
    return 