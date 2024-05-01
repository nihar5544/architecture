import dbConnect from '../../utils/dbConnect';
import Project from '../../models/Project';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.aggregate([
          {
            $lookup: {
              from: 'projectdetails',
              localField: 'Clint',
              foreignField: 'Clint',
              as: 'details'
            }
          }
        ]);
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // Add cases for POST, PATCH, and DELETE if needed
    default:
      res.status(400).json({ success: false });
      break;
  }
}
