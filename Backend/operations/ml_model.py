
class Model:
    def __init__(self, model, mode="ml"):
        self.model = model
        self.mode = mode

    def select_action(self, x):
        return self.model.select_action(x)
