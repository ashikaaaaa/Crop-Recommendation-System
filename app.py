from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os
import traceback

app = Flask(__name__)
CORS(app)  # Allow all origins

def load_model():
    """Helper function to load the model with proper error handling"""
    model_path = "RandomForest.pkl"
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")
    
    if os.path.getsize(model_path) == 0:
        raise ValueError("Model file is empty")
    
    try:
        model = joblib.load(model_path)
        print("Model loaded successfully")
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        print(traceback.format_exc())
        raise

# Load model when starting the server
try:
    model = load_model()
except Exception as e:
    print(f"Failed to load model: {str(e)}")
    model = None

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({
            "error": "Model not available",
            "message": "Server could not load the ML model. Please check server logs."
        }), 503  # Service Unavailable
    
    try:
        # Validate request
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        
        data = request.get_json()
        
        # Check for required fields (note: corrected 'phosphorous' to 'phosphorus')
        required_keys = ["nitrogen", "phosphorus", "potassium", 
                        "temperature", "humidity", "ph", "rainfall"]
        
        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({
                "error": "Missing required parameters",
                "missing": missing_keys
            }), 400
        
        # Convert to numpy array
        features = np.array([
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["ph"]),
            float(data["rainfall"])
        ]).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features)
        predicted_crop = str(prediction[0])
        
        return jsonify({
            "crop": predicted_crop,
            "status": "success"
        })
        
    except ValueError as e:
        return jsonify({
            "error": "Invalid input values",
            "message": str(e)
        }), 400
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            "error": "Prediction failed",
            "message": str(e)
        }), 500

@app.route("/health")
def health_check():
    """Endpoint to check if API is running and model is loaded"""
    status = {
        "api": "running",
        "model_loaded": model is not None
    }
    return jsonify(status)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)