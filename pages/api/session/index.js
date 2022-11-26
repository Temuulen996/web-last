import Session from "../../../models/Session";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const userId = req.query.userId;
  dbConnect();
  if (method == "POST") {
    try {
      const session = await Session.create(req.body);
      console.log(session);
      res.status(201).json(session);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}