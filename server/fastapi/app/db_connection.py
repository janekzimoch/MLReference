'''
We have two ways of connecting to the database. Via Python client and via sqlalchemy
- sqlalchemy - allows us to execute SQL queries of any complexity, yet doesn't have any safety (sql injection) guardrails.
- python client - is more safe and suposedly easier to read, however isn't complete and doesn't allow to execute all queries
'''
import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv, find_dotenv
from supabase import create_client, Client
from supabase.lib.client_options import ClientOptions
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())  # read local .env file


def setupSQL():
    db_url = f'postgresql+psycopg2://{os.environ["DB_USERNAME"]}:{os.environ["DB_PASSWORD"]}@{os.environ["DB_HOST"]}:{os.environ["DB_PORT"]}/{os.environ["DB_NAME"]}'
    engine = create_engine(db_url)
    return engine

def setupClient():
    URL: str = os.environ["DB_SUPABASE_URL"]
    KEY: str = os.environ["DB_SUPABASE_KEY"]
    SCHEMA: str = os.environ["DB_SCHEMA"]
    TABLE: str = os.environ["DB_TABLE"]
    supabase: Client = create_client(URL, KEY, options=ClientOptions(schema=SCHEMA))
    return supabase


def withSQLConnection(engine):
    def decorator(func):
        def wrapper(*args, **kwargs):
            connection = engine.connect()
            result = func(connection, *args, **kwargs)
            connection.close()
            return result
        return wrapper
    return decorator
