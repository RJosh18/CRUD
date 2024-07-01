import userModel from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new userModel(req.body);
    const { email } = userData;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length == 0) {
      return res.status(404).json({ message: "User Not Found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await userModel.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found." });
    }
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await userModel.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found." });
    }
    await userModel.findByIdAndDelete(id);
    res.status(201).json({ message: "User delted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};
