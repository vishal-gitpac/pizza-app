import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();
  if (method == "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method == "PUT") {
    try {
      //new: true returns the updated document or else it returns the original document
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method == "DELETE") {
    try {
      const order = await Order.delete(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
