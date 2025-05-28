from fastapi import APIRouter

from app.api.routes import root, media, pages
from app.core.config import settings

api_router = APIRouter()
# api_router.include_router(root.router)
api_router.include_router(media.router)
# api_router.include_router(pages.router)


# if settings.ENVIRONMENT == "local":
#     api_router.include_router(private.router)
