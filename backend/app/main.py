from fastapi import FastAPI
from fastapi.routing import APIRoute
from app.core.config import settings
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
app.include_router(api_router, prefix=settings.API_V1_STR)

# 將圖片路徑一併納入服務中供前端取用
img_path = "/home/hank/Creator/frontend/src/components/picture"
app.mount("/static/picture", StaticFiles(directory=img_path), name="picture")

# 啟動主程式
# fastapi dev app/main.py --port 8888