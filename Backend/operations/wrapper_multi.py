
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
