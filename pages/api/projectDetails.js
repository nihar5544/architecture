import dbConnect from '../../utils/dbConnect';
import ProjectDetails from '../../models/ProjectDetails';

dbConnect();
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
}
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const projectDetails = await ProjectDetails.find({});
        res.status(200).json({ success: true, data: projectDetails });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { Client, Category, Location, Date, Link, title, description, image, otherImage } = req.body;
        const projectDetail = await ProjectDetails.create({ Client, Category, Location, Date, Link, title, description, image: image ? `data:image/jpeg;base64,${image}` : null, otherImage });
        res.status(201).json({ success: true, data: projectDetail });
      } catch (error) {
        res.status(400).json({ success: false , error});
      }
      break;
    // Add cases for PATCH and DELETE if needed
    default:
      res.status(400).json({ success: false });
      break;
  }
}
