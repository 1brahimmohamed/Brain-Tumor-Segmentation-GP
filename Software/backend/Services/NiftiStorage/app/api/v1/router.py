from fastapi import APIRouter
from app.api.v1.routes.query_routes import query_router
from app.api.v1.routes.store_routes import store_router
from app.api.v1.routes.retrieve_routes import retrieve_router

api_v1_router = APIRouter()


@api_v1_router.get("/")
async def read_root():
    """
    :return:
    """
    return {
        "Route": "API V1",
    }


api_v1_router.include_router(query_router, prefix="/query", tags=["Query Files"])
api_v1_router.include_router(store_router, prefix="/store", tags=["Store Files"])
api_v1_router.include_router(retrieve_router, prefix="/retrieve", tags=["Retrieve Files"])
