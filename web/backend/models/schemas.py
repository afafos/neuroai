from datetime import datetime
from typing import Dict, Any

from pydantic import BaseModel


class ProjectBase(BaseModel):
    name: str
    description: str
    status: str


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    start_date: datetime

    class Config:
        from_attributes = True


class ParameterBase(BaseModel):
    name: str


class Parameter(ParameterBase):
    id: int

    class Config:
        from_attributes = True


class FileBase(BaseModel):
    name: str
    type: str
    path: str
    upload_date: datetime


class FileCreate(FileBase):
    pass


class File(FileBase):
    id: int
    project_id: int

    class Config:
        from_attributes = True


class ObjectBase(BaseModel):
    name: str


class ObjectCreate(ObjectBase):
    pass


class Object(ObjectBase):
    id: int

    class Config:
        from_attributes = True


class ExperimentBase(BaseModel):
    name: str
    description: str | None


class ExperimentCreate(ExperimentBase):
    project_id: int


class Experiment(ExperimentBase):
    id: int

    class Config:
        from_attributes = True


class TifBase(BaseModel):
    color: str
    length_spheres: int
    fluorophore: str


class TifCreate(TifBase):
    pass


class Tif(TifBase):
    id: int
    file_id: int

    class Config:
        from_attributes = True


class DetectorBase(BaseModel):
    name: str
    channel_name: str
    gain: int
    band: str


class DetectorCreate(DetectorBase):
    pass


class Detector(DetectorBase):
    id: int
    tif_id: int

    class Config:
        from_attributes = True


class LaserLineBase(BaseModel):
    name: str
    channel_name: str
    intensity: float
    length: int


class LaserLineCreate(LaserLineBase):
    pass


class LaserLine(LaserLineBase):
    id: int
    tif_id: int

    class Config:
        from_attributes = True


class ConfocalSettingBase(BaseModel):
    scan_speed_hz: int
    magnification: int
    zoom: float
    pinhole: float
    pinhole_airy_au: float


class ConfocalSettingCreate(ConfocalSettingBase):
    pass


class ConfocalSetting(ConfocalSettingBase):
    id: int
    tif_id: int


class DimensionBase(BaseModel):
    axis: str
    logical_size: int
    voxel_size: float


class DimensionCreate(DimensionBase):
    pass


class Dimension(DimensionBase):
    id: int
    tif_id: int

    class Config:
        from_attributes = True


class SubmitData(BaseModel):
    metadata_name: str
    experiment_id: int
    object_id: int

    class Config:
        from_attributes: True


class GetMetadata(BaseModel):
    experiment_id: int


class AddParameters(BaseModel):
    metadata_id: int
    parameters: Dict[str, Any]


class Metadata(BaseModel):
    id: int
    name_metadata: str
    custom_parameters: dict | None
    microscopy_parameters: dict | None
    created_at: datetime
    s3_path: str | None

    class Config:
        from_attributes = True
