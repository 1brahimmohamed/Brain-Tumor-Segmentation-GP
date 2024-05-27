import uvicorn

if __name__ == "__main__":
    # start the server with the app.py file
    uvicorn.run(
        app="app.app:app",
        host="0.0.0.0",
        port=8080,
        reload=True
    )
