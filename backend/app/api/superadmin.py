from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.models.user import User as UserModel
from app.api.api import get_current_user

router = APIRouter(prefix="/superadmin", tags=["superadmin"])


def require_superadmin(current_user: UserModel = Depends(get_current_user)):
    if current_user.role != "SuperAdmin":
        raise HTTPException(status_code=403, detail="SuperAdmin only")
    return current_user


@router.get("/overview")
def superadmin_overview(
    db: Session = Depends(get_db),
    _: UserModel = Depends(require_superadmin)
):
    total_advisors = db.query(UserModel).filter(UserModel.role == "Advisor").count()
    active_advisors = db.query(UserModel).filter(UserModel.role == "Advisor", UserModel.is_active == True).count()
    total_admins = db.query(UserModel).filter(UserModel.role == "Admin").count()
    total_clients = db.query(UserModel).filter(UserModel.role == "Client").count()
    return {
        "total_advisors": total_advisors,
        "active_advisors": active_advisors,
        "total_admins": total_admins,
        "total_clients": total_clients,
    }


@router.get("/advisors")
def list_advisors(
    db: Session = Depends(get_db),
    _: UserModel = Depends(require_superadmin)
):
    advisors = db.query(UserModel).filter(UserModel.role.in_(["Advisor", "Admin"]))
    result = []
    for u in advisors:
        result.append({
            "id": u.id,
            "email": u.email,
            "name": u.name,
            "username": getattr(u, "username", None),
            "role": u.role,
            "is_active": u.is_active,
            "created_at": u.created_at,
            "client_count": len(getattr(u, "clients", []) or []),
        })
    return result


from pydantic import BaseModel


class AdvisorUpdate(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None
    is_active: Optional[bool] = None
    role: Optional[str] = None  # allow changing between Advisor/Admin if needed


@router.patch("/advisors/{user_id}")
def update_advisor(
    user_id: int,
    payload: AdvisorUpdate,
    db: Session = Depends(get_db),
    _: UserModel = Depends(require_superadmin)
):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = payload.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "username": getattr(user, "username", None),
        "role": user.role,
        "is_active": user.is_active,
        "created_at": user.created_at,
    }


