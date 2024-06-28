from sqlalchemy.orm import Session
from app.model import Report
from app.schemas import RequestReport


def create_report(db: Session, report: RequestReport):
    try:
        report = Report(**report.model_dump())
        db.add(report)
        db.commit()
        db.refresh(report)
        return report
    except:
        return None


def get_reports(db: Session):
    try:
        return db.query(Report).all()
    except:
        return None


def get_report_by_id(db: Session, report_id: int):
    try:
        return db.query(Report).filter(Report.id == report_id).first()
    except:
        return None


def get_report_by_study_id(db: Session, study_id: str):
    try:
        print("Good")
        report = db.query(Report).filter(Report.studyId == study_id).first()
        print("Report is")
        print(report)
        return report
    except:
        return None


def update_report(db: Session, report_id: int, requestedReport: RequestReport):
    try:
        report = db.query(Report).filter(Report.id == report_id).first()
        report.content = requestedReport.content
        db.commit()
        db.refresh(report)
        return report
    except:
        return None


def delete_report(db: Session, report_id: int):
    try:
        report = db.query(Report).filter(Report.id == report_id).first()
        db.delete(report)
        db.commit()
        return True
    except:
        return None


def delete_reports(db: Session):
    try:
        db.query(Report).delete()
        db.commit()
        return True
    except:
        return None
