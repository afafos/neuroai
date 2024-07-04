import datetime
from typing import Union, List

from fastapi import UploadFile, File, Depends
from sqlalchemy import select, update

from database import models
from web.backend.models import schemas
from web.backend.router import Router

router = Router()


@router.post("/upload/")
async def upload_file(
        files: List[UploadFile] = File(),
        metadata_file: UploadFile = None,
        data: schemas.SubmitData = Depends()
):
    metadata = await router.db.create_object(model=models.Metadata,
                                             name_metadata=data.metadata_name,
                                             experiment_id=data.experiment_id,
                                             object_id=data.object_id)
    experiment = await router.db.sql_query(
        query=select(models.Experiment).where(models.Experiment.id == data.experiment_id))
    project = await router.db.sql_query(
        query=select(models.Project).where(models.Project.id == experiment.project_id))
    s3_path = f"{project.name}/{experiment.name}/{metadata.name_metadata}"
    if metadata_file:
        await router.s3.upload_file(file=metadata_file.file,
                                    s3_key=f"{s3_path}/microscopy_metadata/{metadata_file.filename}")
    for file in files:
        await router.s3.upload_file(file=file.file,
                                    s3_key=f"{s3_path}/{file.filename}")
    await router.db.sql_query(
        query=update(models.Metadata).where(models.Metadata.id == metadata.id).values(
            s3_path=s3_path), is_update=True)
    return {"metadata_id": metadata.id}


@router.get("/metadata/", response_model=list[schemas.Metadata])
async def get_metadata_by_experiment_id(data: schemas.GetMetadata = Depends()):
    metadata = await router.db.sql_query(
        query=select(models.Metadata).where(models.Metadata.experiment_id == data.experiment_id),
        single=False)
    return metadata


@router.post("/custom_parameters")
async def add_custom_parameters(data: schemas.AddParameters):
    metadata = await router.db.sql_query(
        query=update(models.Metadata).where(models.Metadata.id == data.metadata_id).values(
            custom_parameters=data.parameters), is_update=True)

    return {"data": data,
            "metadata": metadata}


@router.get("/projects", response_model=list[schemas.Project])
async def get_projects():
    projects = await router.db.sql_query(query=select(models.Project), single=False)
    return projects


@router.get("/experiments", response_model=list[schemas.Experiment])
async def get_experiments():
    experiments = await router.db.sql_query(query=select(models.Experiment), single=False)
    return experiments


@router.get("/objects", response_model=list[schemas.Object])
async def get_objects():
    objects = await router.db.sql_query(query=select(models.Object), single=False)
    return objects


@router.post("/add_parameter", response_model=schemas.Parameter)
async def add_parameter(data: schemas.ParameterBase):
    parameter = await router.db.create_object(model=models.Parameter, name=data.name)
    return parameter


@router.post("/add_project", response_model=schemas.Project)
async def add_project(data: schemas.ProjectCreate):
    project = await router.db.create_object(model=models.Project, name=data.name,
                                            description=data.description, status=data.status)
    return project


@router.post("/add_experiment", response_model=schemas.Experiment)
async def add_experiment(data: schemas.ExperimentCreate):
    experiment = await router.db.create_object(model=models.Experiment, name=data.name,
                                               description=data.description,
                                               project_id=data.project_id)
    return experiment


@router.get("/parameters", response_model=List[schemas.Parameter])
async def get_parameters():
    parameters = await router.db.sql_query(query=select(models.Parameter), single=False)
    return parameters


@router.get("/experiments_by/{project_id}", response_model=List[schemas.Experiment])
async def get_experiments_by_project(project_id: int):
    experiments = await router.db.sql_query(
        query=select(models.Experiment).where(models.Experiment.project_id == project_id),
        single=False)
    return experiments


@router.get("/projects/{project_id}")
async def get_project(project_id: int):
    project = await router.db.sql_query(
        select(models.Project).where(models.Project.id == project_id))
    return project


@router.post("/add_object", response_model=schemas.Object)
async def add_object(data: schemas.ObjectCreate):
    object = await router.db.create_object(model=models.Object, name=data.name)
    return object


@router.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@router.get("/experiment/{experiment_id}")
async def get_experiment(experiment_id: int):
    experiment = await router.db.sql_query(
        select(models.Experiment).where(models.Experiment.id == experiment_id))
    return experiment



