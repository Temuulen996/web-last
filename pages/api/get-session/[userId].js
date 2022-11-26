import Session from "../../../models/Session";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const userId = req.query.userId;
  dbConnect();
  if (method == "GET") {
    try {
      const session = await Session.find({ _user: userId });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
