import { dbConnect } from "../../../../utils/dbConnect";
import ProjectDetails from "../../../../models/ProjectDetails";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    // Select only the 'image', 'title', and 'Category' fields
    const projectDetails = await ProjectDetails.find({}).select('image title Category');
    
    return NextResponse.json(
      { success: true, data: projectDetails },
      {
        status: 200, 
      }
    );
  } catch (error) {
    console.log(error);
    return "Error in gettting data !!", 404, false;
  }
}
export async function POST(request) {
  try {
    await dbConnect();
    const {
      Client,
      Category,
      Location,
      Date,
      Link,
      title,
      description,
      image,
      otherImage,
    } = await request.json();

    const projectDetail = await ProjectDetails.create({
      Client,
      Category,
      Location,
      Date,
      Link,
      title,
      description,
      image: image ? `data:image/jpeg;base64,${image}` : null,
      otherImage,
    });
    return NextResponse.json(
      {
        success: true,
        data: projectDetail,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return "Error in gettting data !!", 404, false;
  }
}
