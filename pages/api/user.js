import connectToDatabase from "../../lib/mongoose";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectToDatabase(); // این مهمه
    const data = req.body;
    const user = await User.create(data);
    return res.status(200).json(user);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
