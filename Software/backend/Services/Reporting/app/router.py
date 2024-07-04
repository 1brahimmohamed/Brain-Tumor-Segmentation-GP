from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from app.config import SessionLocal
import app.crud
from app.schemas import RequestReport, Response


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
async def create_report(report: RequestReport, db: Session = Depends(get_db)):
    _report = app.crud.create_report(db, report)
    if not _report:
        return Response(
            code=404, status="Fail", message="Report not created", result=None
        ).model_dump(exclude_none=True)

    return Response(
        code=200,
        status="Success",
        message="Report created successfully",
        result=_report,
    ).model_dump(exclude_none=True)


@router.get("/")
async def get_reports(db: Session = Depends(get_db)):
    _reports = app.crud.get_reports(db)
    if not _reports:
        return Response(
            code=200, status="Success", message="No reports found", result=None
        ).model_dump(exclude_none=True)

    return Response(
        code=200,
        status="Success",
        message="Reports retrieved successfully",
        result=_reports,
    ).model_dump(exclude_none=True)


@router.get("/{study_id}")
async def get_reports(
    study_id: str,
    db: Session = Depends(get_db),
):
    _reports = app.crud.get_reports_by_study_id(db, study_id)
    if not _reports:
        return Response(
            code=404,
            status="Fail",
            message="No report found with this ID",
            result=None,
        ).model_dump(exclude_none=True)

    return Response(
        code=200,
        status="Success",
        message="Report retrieved successfully",
        result=_reports,
    ).model_dump(exclude_none=True)


@router.put("/{report_id}")
async def update_report(
    report: RequestReport,
    report_id: int = Path(..., title="The ID of the report to update"),
    db: Session = Depends(get_db),
):
    _report = app.crud.update_report(db, report_id, report)
    if not _report:
        return Response(
            code=200,
            status="Success",
            message="No report found with this ID",
            result=None,
        ).model_dump(exclude_none=True)

    return Response(
        code=200,
        status="Success",
        message="Report updated successfully",
        result=_report,
    ).model_dump(exclude_none=True)


@router.delete("/{report_id}/study/{study_id}")
async def delete_report(
    report_id: int = Path(..., title="The ID of the report to delete"),
    study_id: str = Path(..., title="The ID of the study to which the report belongs"),
    db: Session = Depends(get_db),
):

    if not app.crud.delete_report(db, report_id, study_id):
        return Response(
            code=200,
            status="Success",
            message="No report found with this ID",
            result=None,
        ).model_dump(exclude_none=True)

    return Response(
        code=200, status="Success", message="Report deleted successfully", result=None
    ).model_dump(exclude_none=True)


@router.delete("/")
async def delete_reports(db: Session = Depends(get_db)):

    if not app.crud.delete_reports(db):
        return Response(
            code=200, status="Success", message="No reports found", result=None
        ).model_dump(exclude_none=True)

    return Response(
        code=200,
        status="Success",
        message="All reports deleted successfully",
        result=None,
    ).model_dump(exclude_none=True)
