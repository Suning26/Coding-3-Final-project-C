import torch
from torchvision import transforms
from PIL import Image

class FoodClassifier:
    def __init__(self, model_path='models/food_classifier.pt'):
        self.model = torch.load(model_path, map_location='cpu')
        self.model.eval()
        self.transform = transforms.Compose([
            transforms.Resize((64, 64)),
            transforms.ToTensor()
        ])
        self.labels = ['milk', 'carrot', 'chicken', 'egg', 'apple']  # 示例类别

    def predict(self, image_path):
        image = Image.open(image_path).convert('RGB')
        image = self.transform(image).unsqueeze(0)
        output = self.model(image)
        _, predicted = torch.max(output, 1)
        return self.labels[predicted.item()]
