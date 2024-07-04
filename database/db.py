import logging

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession


class Database:
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.__engine = None

    async def create_object(self, model, **attributes):
        async with AsyncSession(self.__engine, expire_on_commit=False) as session:
            object = model(**attributes)
            session.add(object)
            await session.commit()
            return object

    async def sql_query(self, query, single=True, is_update=False, *args, **kwargs):
        async with AsyncSession(self.__engine) as session:
            result = await session.execute(query)
            if not is_update:
                return result.scalars().first() if single else result.scalars().all()
            await session.commit()
            return result

    async def connect(self):
        self.__engine = create_async_engine(self.db_url)
        await self.sql_query(query=select(1))
        logging.info("Database has been connected")

    async def disconnect(self):
        if self.__engine:
            await self.__engine.dispose()
        logging.info("Database has been disconnected")
