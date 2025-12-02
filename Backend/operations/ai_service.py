import torch
import pandas as pd
import os
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier

# ======================================
# Wrapper for Multi-Output
# ======================================
class WrapperMulti:
    def __init__(self, model, feature_names):
        self.model = model
        self.feature_names = feature_names

    def select_action(self, x):
        """
        x = 1D numpy array of feature values
        returns: (berth, terminal)
        """
        pred = self.model.predict([x])[0]
        return int(pred[0]), int(pred[1])


# ======================================
# Unified Model
# ======================================
class Model:
    def __init__(self, model, mode="ml"):
        self.model = model
        self.mode = mode

    def select_action(self, x):
        return self.model.select_action(x)

class AIModelService:
    def __init__(self):
        self.model_path = r"d:\fyp\Portflow\Models\best_model.pth"
        self.csv_path = r"d:\fyp\Portflow\Models\preprocessed_data.csv"
        self.agent = None

    def load_model(self):
        if self.agent is None:
            if os.path.exists(self.model_path):
                try:
                    # Load the model safely
                    import __main__
                    setattr(__main__, "Model", Model)
                    setattr(__main__, "WrapperMulti", WrapperMulti)
                    
                    with torch.serialization.safe_globals([Model, WrapperMulti]):
                        self.agent = torch.load(self.model_path, weights_only=False)
                    print("Model loaded successfully!")
                except Exception as e:
                    print(f"Error loading model: {e}")
                    raise e
            else:
                raise FileNotFoundError(f"Model file not found at {self.model_path}")

    def predict(self):
        self.load_model()
        
        if not os.path.exists(self.csv_path):
            raise FileNotFoundError(f"CSV file not found at {self.csv_path}")

        # Load new input CSV
        new_data = pd.read_csv(self.csv_path)

        # Keep only training features
        # Accessing feature_names from the loaded agent's model (WrapperMulti)
        feature_names = self.agent.model.feature_names
        X_new = new_data[feature_names].copy()

        # Convert datetime columns to numeric (same as training)
        datetime_cols = [col for col in X_new.columns if 'datetime' in col.lower()]
        for col in datetime_cols:
            X_new[col] = pd.to_datetime(X_new[col], errors='coerce')
            X_new[col] = X_new[col].astype('int64') // 10**9

        # Predict for all rows
        preds = []
        for i in range(len(X_new)):
            x = X_new.iloc[i].values
            berth, terminal = self.agent.select_action(x)
            preds.append([berth, terminal])

        # Add predictions to original dataframe
        pred_df = new_data.copy()
        pred_df['Predicted_Berth'] = [p[0] for p in preds]
        pred_df['Predicted_Terminal'] = [p[1] for p in preds]

        # Convert to list of dicts for JSON response
        # Replace NaN with None/null for JSON compatibility
        return pred_df.where(pd.notnull(pred_df), None).to_dict(orient='records')
