from datetime import datetime
from typing import List
from sqlalchemy import JSON, ForeignKey, func
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(AsyncAttrs, DeclarativeBase):
    pass


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    start_date: Mapped[datetime] = mapped_column(server_default=func.now())
    status: Mapped[str] = mapped_column(default="started")

    experiments: Mapped[List["Experiment"]] = relationship()


class Object(Base):
    __tablename__ = "objects"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)


class Experiment(Base):
    __tablename__ = "experiments"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=True)
    start_date: Mapped[datetime] = mapped_column(server_default=func.now())
    project_id: Mapped[int] = mapped_column(
        ForeignKey(column="projects.id", ondelete="CASCADE"), nullable=True
    )

    metadatesdates: Mapped[List["Metadata"]] = relationship()


class Metadata(Base):
    __tablename__ = "metadatates"

    id: Mapped[int] = mapped_column(primary_key=True)
    name_metadata: Mapped[str] = mapped_column()
    custom_parameters: Mapped[dict | list] = mapped_column(type_=JSON, nullable=True)
    microscopy_parameters: Mapped[dict | list] = mapped_column(type_=JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    s3_path: Mapped[str] = mapped_column(nullable=True)

    experiment_id: Mapped[int] = mapped_column(
        ForeignKey(column="experiments.id", ondelete="CASCADE"))
    object_id: Mapped[int] = mapped_column(
        ForeignKey(column="objects.id", ondelete="CASCADE"))


class Parameter(Base):
    __tablename__ = "parameters"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
