import List from "../../../models/List";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const userId = req.query.userId;
  dbConnect();
  if (method == "GET") {
    try {
      const users = await List.find({ _user: userId, type: "WITHDRAW" });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method == "PUT") {
    try {
      const user = await List.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
