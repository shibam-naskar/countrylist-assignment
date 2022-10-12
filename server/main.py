from flask import Flask, jsonify
from flask_cors import CORS
import pymongo

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_Headers'] = 'Content-Type'

client = pymongo.MongoClient("mongodb+srv://SHIBAM:xm6dqUdX8lpTQRhL@cluster0.kg8r2.mongodb.net")

@app.route('/', methods = ['GET'])
def retrieveAll():
    final_result = []
    db = client['test']
    collection = db['responses']
    daata = collection.find()
    for a in daata:
        final_result.append({"name":a['name'],"img":a['img']})
    return jsonify(final_result)

if __name__ == '__main__':
    app.run(debug = True)