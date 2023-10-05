import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())  # read local .env file

db_url = f'postgresql+psycopg2://{os.environ["DB_USERNAME"]}:{os.environ["DB_PASSWORD"]}@{os.environ["DB_HOST"]}:{os.environ["DB_PORT"]}/{os.environ["DB_NAME"]}'
engine = create_engine(db_url)
connection = engine.connect()


# Example: Execute a simple SELECT query
query = text("SELECT DISTINCT(year) FROM documents")
result = connection.execute(query)

# Fetch the results
for row in result:
    print(row)

# Close the connection
connection.close()

