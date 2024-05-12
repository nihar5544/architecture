import { dbConnect } from "../../../../../utils/dbConnect";
import ProjectDetails from "../../../../../models/ProjectDetails";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    if (id) {
      await dbConnect();
      const projectDetail = await ProjectDetails.findById(id);
      if (!projectDetail) {
        return "Project detail not found!", 404, false;
      }
      
      return NextResponse.json(
        { success: true, data: projectDetail },
        { status: 200 }
      );
    } else {
      // If no ID is provided, return all project details
      const allProjectDetails = await ProjectDetails.find();
      return NextResponse.json(
        { success: true, data: allProjectDetails },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return "Error in getting data !!", 404, false;
  }
}

export async function PUT(request, { params, body }) {
  const { id } = params;
  const { newData } = body;
  try {
    await dbConnect();
    const updatedProjectDetail = await ProjectDetails.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );
    if (!updatedProjectDetail) {
      return "Project detail not found!", 404, false;
    }
    return NextResponse.json(
      { success: true, data: updatedProjectDetail },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return "Error in updating data !!", 404, false;
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await dbConnect();
    const deletedProjectDetail = await ProjectDetails.findByIdAndDelete(id);
    if (!deletedProjectDetail) {
      return "Project detail not found!", 404, false;
    }
    return NextResponse.json(
      { success: true, data: deletedProjectDetail },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return "Error in deleting data !!", 404, false;
  }
}
