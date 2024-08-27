// pages/api/contact.js
import { dbConnect } from "../../../../utils/dbConnect";
import ContactForm from "../../../../models/ContactForm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, subject, phone, description } = await req.json();
    await dbConnect();

    const newContact = await ContactForm.create({
      name,
      email,
      subject,
      phone,
      description,
    });

    return NextResponse.json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error saving contact form:", error);

    return NextResponse.json(
      { success: false, message: "Error saving contact form!" + error },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const contactForms = await ContactForm.find(); // Fetch all contact form entries

    return NextResponse.json({ success: true, data: contactForms });
  } catch (error) {
    console.error("Error retrieving contact forms:", error);

    return NextResponse.json(
      { success: false, message: "Error retrieving contact forms!" + error },
      { status: 500 }
    );
  }
}
