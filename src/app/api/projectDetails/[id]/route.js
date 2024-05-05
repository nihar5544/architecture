import { dbConnect } from "../../../../../utils/dbConnect";
import ProjectDetails from "../../../../../models/ProjectDetails";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { id } = params;
  try {
    
    console.log(id, "iddddddddddddddd");
    if (id) {
      await dbConnect();
      const projectDetail = await ProjectDetails.findById(id);
      if (!projectDetail) {
        return  "Project detail not found!", 404, false;
      }
      
      return NextResponse.json(
        { success: true, data: projectDetail },
        { status: 200 }
      );
    }
    // If no ID is provided, return all project details
  } catch (error) {
    console.log(error);
    return "Error in gettting data !!", 404, false;
  }
}
