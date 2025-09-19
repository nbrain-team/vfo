import logging
import re


class RedactFilter(logging.Filter):
    EMAIL_RE = re.compile(r"([A-Za-z0-9._%+-])[A-Za-z0-9._%+-]*(@[A-Za-z0-9.-]+\.[A-Za-z]{2,})")
    LONG_TOKEN_RE = re.compile(r"\b([A-Za-z0-9_-]{8,})\b")
    KEYWORDS = ("password", "token", "secret", "apikey", "api_key", "authorization")

    def _mask_email(self, text: str) -> str:
        return self.EMAIL_RE.sub(lambda m: f"{m.group(1)}***{m.group(2)}", text)

    def _mask_tokens(self, text: str) -> str:
        def repl(m):
            s = m.group(1)
            # Keep short alphanumerics (likely not sensitive)
            if len(s) < 16:
                return s
            return f"{s[:2]}***{s[-2:]}"
        return self.LONG_TOKEN_RE.sub(repl, text)

    def _mask_keywords(self, text: str) -> str:
        # Mask simple key=value patterns for sensitive keys
        for k in self.KEYWORDS:
            text = re.sub(rf"{k}\s*=\s*([^\s,;]+)", rf"{k}=***", text, flags=re.IGNORECASE)
        return text

    def filter(self, record: logging.LogRecord) -> bool:
        try:
            msg = record.getMessage()
            msg = self._mask_email(msg)
            msg = self._mask_tokens(msg)
            msg = self._mask_keywords(msg)
            # Replace record message safely
            record.msg = msg
            record.args = ()
        except Exception:
            pass
        return True


def configure_logging() -> None:
    filt = RedactFilter()
    root_logger = logging.getLogger()
    root_logger.addFilter(filt)
    for name in ("uvicorn", "uvicorn.access", "uvicorn.error"):
        logging.getLogger(name).addFilter(filt)

