import { dbConnect } from "../../utils/dbConnect";
import ProjectDetail from "../../models/ProjectDetails";

export default async function sitemap() {
  const base = "https://mcad.in";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  let projectPages = [];
  try {
    await dbConnect();
    const projects = await ProjectDetail.find({}, "_id").lean();
    projectPages = projects.map((p) => ({
      url: `${base}/project-details/${p._id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // silently skip if DB unavailable at build time
  }

  return [...staticPages, ...projectPages];
}
