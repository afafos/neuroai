FROM python:3.10
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get clean
RUN apt-get install -y npm
RUN python -m pip install --upgrade pip
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
WORKDIR /app/web/frontend
RUN npm install
WORKDIR /app
