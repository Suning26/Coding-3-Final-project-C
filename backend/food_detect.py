from models.food_classifier import FoodClassifier

classifier = FoodClassifier()

def detect_ingredients(image_path):
    return classifier.predict(image_path)
