FROM python:3.9

WORKDIR /app

COPY ./app /app

RUN pip install -r /app/requirements.txt

EXPOSE 4001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "4001"]

# docker build -t fastapi_server .
# docker run -d --name fastapi_server -p 4001:4001 fastapi_server