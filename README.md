## 🌾 Crop Recommendation System using Machine Learning

This project aims to recommend the most suitable crop to grow based on various environmental and soil parameters such as Nitrogen, Phosphorus, Potassium, temperature, humidity, pH, and rainfall. The model leverages machine learning algorithms to make accurate predictions, which can help farmers and agricultural experts make informed decisions.

---

### 🚀 Features

- Predicts the best crop to grow for given soil and climate conditions
- Supports multiple ML models: Random Forest, SVM, Logistic Regression, Naive Bayes, Decision Tree
- Model evaluation using classification report and accuracy score
- Trained model exported using Pickle for deployment

---

### 📂 Dataset

- **Source:** [Kaggle Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)
- **Columns:**  
  'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label' (crop)

---

### 🛠️ Tech Stack

- **Languages:** Python  
- **Libraries:**  
  - pandas, numpy, matplotlib, seaborn  
  - scikit-learn (Random Forest, SVM, Logistic Regression, Naive Bayes, Decision Tree)  
  - pickle (for model serialization)

---

### 📊 Model Training & Evaluation

- Data split into 80% training and 20% testing
- Random Forest used for feature importance analysis
- Best-performing model saved as model_name.pkl'

