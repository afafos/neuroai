from fastapi import FastAPI, HTTPException
from asyncpg import UniqueViolationError
from typing import Callable, Any  # Импортируйте Callable для явного указания типов


async def handle_unique_violation_error(request: Any, call_next: Callable) -> Any:
    try:
        response = await call_next(request)
        return response
    except UniqueViolationError as e:
        error_message = "Ошибка уникальности: такая запись уже существует."
        raise HTTPException(status_code=400, detail=error_message)
