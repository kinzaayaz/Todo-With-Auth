from pymongo.mongo_client import MongoClient
import urllib.parse

# Connect the database
try:
    # Encode username and password
    username = urllib.parse.quote_plus("sami606713")
    password = urllib.parse.quote_plus("$@m!u11@h")

    uri = f"mongodb+srv://{username}:{password}@cluster0.pawnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    # Create a new client and connect to the server
    client = MongoClient(uri)

    # Connect to thse database
    db = client['Todo-App']

    # Connect to the collection
    todo_collection = db['todos']

    # collection for users
    user_collection = db['users']
    print("Connected to the database")
except Exception as e:
    print(e)