import { dbConnect } from "../../../../../utils/dbConnect";

import ContactForm from "../../../../../models/ContactForm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await dbConnect();

    if (id) {
      const contactDetail = await ContactForm.findById(id);
      if (!contactDetail) {
        return NextResponse.json(
          { success: false, message: "Content detail not found!" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: contactDetail },
        { status: 200 }
      );
    } else {
      const allProjectDetails = await ContactForm.find();
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

    let contactDetail = await ContactForm.findById(id);
    if (!contactDetail) {
      return NextResponse.json(
        { success: false, message: "Content detail not found!" },
        { status: 404 }
      );
    }

    contactDetail.title = title;
    contactDetail.description = description;
    contactDetail.image = image;
    contactDetail.otherImage = otherImage;

    const updatedProjectDetail = await contactDetail.save();
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

    const deletedProjectDetail = await ContactForm.findByIdAndDelete(id);

    if (!deletedProjectDetail) {
      return NextResponse.json(
        { success: false, message: "Content detail not found!" },
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
