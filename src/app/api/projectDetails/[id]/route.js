import { dbConnect } from "../../../../../utils/dbConnect";
import ProjectDetail from "../../../../../models/ProjectDetails";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await dbConnect();

    if (id) {
      const projectDetail = await ProjectDetail.findById(id);
      if (!projectDetail) {
        return NextResponse.json(
          { success: false, message: "Project detail not found!" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: projectDetail },
        { status: 200 }
      );
    } else {
      const allProjectDetails = await ProjectDetail.find();
      return NextResponse.json(
        { success: true, data: allProjectDetails },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error in getting data!" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    await dbConnect();

    const { title, description, image, otherImage } = await request.json();

    let projectDetail = await ProjectDetail.findById(id);
    if (!projectDetail) {
      return NextResponse.json(
        { success: false, message: "Project detail not found!" },
        { status: 404 }
      );
    }

    projectDetail.title = title;
    projectDetail.description = description;
    projectDetail.image = image;
    projectDetail.otherImage = otherImage;

    const updatedProjectDetail = await projectDetail.save();
    return NextResponse.json(
      { success: true, data: updatedProjectDetail },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error in updating project detail!" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await dbConnect();

    const deletedProjectDetail = await ProjectDetail.findByIdAndDelete(id);

    if (!deletedProjectDetail) {
      return NextResponse.json(
        { success: false, message: "Project detail not found!" },
        { status: 404 } // Change status to 404 to indicate not found
      );
    }

    return NextResponse.json(
      { success: true, data: deletedProjectDetail },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting project detail:", error);
    return NextResponse.json(
      { success: false, message: "Error in deleting project detail!" },
      { status: 500 }
    );
  }
}
