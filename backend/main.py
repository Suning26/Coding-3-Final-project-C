from flask import Flask, request, jsonify
from backend.food_detect import detect_ingredients
from backend.story_gen import get_story
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload_images', methods=['POST'])
def upload_file():
    file = request.files['image']
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    ingredient = detect_ingredients(path)
    story = get_story(ingredient)

    return jsonify({
        'ingredient': ingredient,
        'story': story
    })

if __name__ == '__main__':
    app.run(debug=True)
