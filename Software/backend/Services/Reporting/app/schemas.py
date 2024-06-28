from typing import List, Optional, Generic, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class ReportSchema(BaseModel):
    studyId: str
    content: str

    class Config:
        orm_mode = True


class RequestReport(ReportSchema):
    pass


class Response(BaseModel, Generic[T]):
    code: T
    status: str
    message: str
    result: Optional[T]
