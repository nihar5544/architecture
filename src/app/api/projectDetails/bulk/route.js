import { dbConnect } from "../../../../../utils/dbConnect";
import ProjectDetails from "../../../../../models/ProjectDetails";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { projects } = await request.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      return NextResponse.json(
        { success: false, message: "Provide a non-empty projects array" },
        { status: 400 }
      );
    }

    if (projects.length > 100) {
      return NextResponse.json(
        { success: false, message: "Maximum 100 projects per bulk upload" },
        { status: 400 }
      );
    }

    const docs = projects.map((p) => ({
      Client: String(p.Client || ""),
      Category: String(p.Category || ""),
      Location: String(p.Location || ""),
      Date: String(p.Date || ""),
      Link: String(p.Link || ""),
      title: String(p.title || ""),
      description: String(p.description || ""),
      image: String(p.image || ""),
      otherImage: Array.isArray(p.otherImage) ? p.otherImage : [],
    }));

    const created = await ProjectDetails.insertMany(docs, { ordered: false });
    return NextResponse.json(
      { success: true, count: created.length, data: created },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in bulk upload: " + error.message },
      { status: 500 }
    );
  }
}
