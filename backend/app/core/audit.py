import json
import logging
import os
import uuid
from fastapi import Request, HTTPException
from ipaddress import ip_network, ip_address

logger = logging.getLogger("audit")

def log_admin_action(request: Request, user, action: str, detail: dict | None = None) -> None:
    try:
        request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
        record = {
            "type": "admin_action",
            "request_id": request_id,
            "ip": request.client.host if request.client else None,
            "method": request.method,
            "path": request.url.path,
            "user_id": getattr(user, "id", None),
            "user_email": getattr(user, "email", None),
            "role": getattr(user, "role", None),
            "action": action,
            "detail": detail or {},
        }
        logger.info(json.dumps(record))
    except Exception:
        # Do not block on audit logging
        pass

def enforce_admin_ip_allowlist(request: Request):
    allowlist = os.getenv("ADMIN_IP_ALLOWLIST", "").strip()
    if not allowlist:
        return  # no restriction configured
    try:
        client_ip = request.client.host if request.client else None
        if not client_ip:
            raise HTTPException(status_code=403, detail="Forbidden")
        ip_obj = ip_address(client_ip)
        entries = [e.strip() for e in allowlist.split(",") if e.strip()]
        for entry in entries:
            try:
                if "/" in entry:
                    if ip_obj in ip_network(entry, strict=False):
                        return
                else:
                    if client_ip == entry:
                        return
            except Exception:
                continue
        raise HTTPException(status_code=403, detail="Forbidden")
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=403, detail="Forbidden")

