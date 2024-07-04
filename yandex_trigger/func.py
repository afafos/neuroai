import json
import logging

import boto3
import sentry_sdk
from sqlalchemy import update

from config import settings
from database import models
from database.db import Database
from parse import parse_xml


class Object:
    def __init__(self, name):
        self.name = name


async def handler(event, context):
    logging.getLogger().setLevel(logging.INFO)
    db = Database(db_url=settings.db_url)
    await db.connect()
    sentry_sdk.init(
        dsn=settings.sentry_dsn,
        traces_sample_rate=1.0,
        profiles_sample_rate=1.0,
    )

    try:
        messages = event.get("messages", [])

        objects: list[Object] = []
        logging.info("START")
        for message in messages:
            # event_metadata = message.get('event_metadata', {})
            details = message.get("details", {})
            logging.info(f" Message : {message}")
            # event_type = details.get('event_type', '')
            object_name = details.get("object_id", "")

            if object_name:
                objects.append(Object(name=object_name))
        s3 = boto3.client(
            "s3",
            endpoint_url=settings.yandex_endpoint,
            aws_access_key_id=settings.yandex_access_key,
            aws_secret_access_key=settings.yandex_secret_key,
        )

        for obj in objects:
            logging.info(f"Object: {obj.name}")
            dirs: list[str] = obj.name.split("/")
            logging.info(dirs)
            file_name = dirs[-1]
            metadata_id = int(dirs[-3].split(":")[0])

            local_file_path = f"/tmp/{file_name}"
            logging.info("Download metadata started")
            try:
                s3.download_file(settings.yandex_bucket_name, obj.name, local_file_path)
                logging.info("Downloading ended")
                data = parse_xml(local_file_path)
                logging.info("Metadata from file .xml parsed")
                await db.sql_query(
                    query=update(models.Metadata).where(models.Metadata.id == metadata_id).values(
                        microscopy_parameters=data), is_update=True)
                logging.info("Metadata downloaded to database")
            except Exception as e:
                logging.error(e)
            finally:
                await db.disconnect()
                logging.info("Function finished")

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"changed_objects": [obj.name for obj in objects]}),
        }

    except Exception as e:
        logging.error(e)
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)}),
        }
