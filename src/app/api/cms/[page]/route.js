import { dbConnect } from "../../../../../utils/dbConnect";
import SiteContent from "../../../../../models/SiteContent";
import { NextResponse } from "next/server";

export const defaultContent = {
  home: {
    hero: {
      title: "Let Your Home\nBe Unique",
      subtitle:
        "Your home should be as unique as you are. We create spaces tailored to your personal style, ensuring every detail reflects your individuality.",
      buttonText: "Get Started",
    },
    about: {
      title: "Elevating the Art of\nStylish Living",
      description:
        "We design spaces that blend beauty and function. Every project is thoughtfully crafted to reflect your unique style and needs, creating environments that are both timeless and practical.",
      phone: "+91 98257 39499",
      buttonText: "Get Free Estimate",
    },
    stats: [
      { value: "25+", label: "Years Of Experience" },
      { value: "85+", label: "Success Project" },
      { value: "3+", label: "Active Project" },
      { value: "100+", label: "Happy Customers" },
    ],
    services: [
      {
        title: "Project Plan",
        content:
          "While there are countless variations of passages available, not all are created equal. At M-Cad, we prioritize precision and quality in every aspect of our projects.",
      },
      {
        title: "Interior Work",
        content:
          "Interior design is more than just aesthetics; it's about creating spaces that resonate with your lifestyle. Our team ensures that every detail is thoughtfully curated.",
      },
      {
        title: "Realization",
        content:
          "Turning ideas into reality requires skill, precision, and a deep understanding of both design and execution. Our commitment is to bring your vision to life.",
      },
    ],
    followTitle: "Follow Our Projects",
    followSubtitle:
      "Stay connected with our latest work. Explore how we transform ideas into stunning spaces, showcasing the art of thoughtful design and execution.",
  },
  services: {
    cards: [
      {
        title: "Project Plan",
        content:
          "Every project is unique, and so is our approach. Our process is tailored to ensure precision and success at every stage.",
      },
      {
        title: "Interior Work",
        content:
          "Interior design is more than just aesthetics—it's about creating spaces that truly reflect your personality and needs.",
      },
      {
        title: "Retail Design",
        content:
          "Retail spaces require a special touch to attract and engage customers. Our design strategies incorporate creativity and customer behavior insights.",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Concept & Details",
        description:
          "We start by understanding your vision, meticulously crafting the concept and refining every detail to ensure a strong foundation for your project.",
        image: "",
      },
      {
        number: "02",
        title: "Strategic Planning",
        description:
          "Our team develops a comprehensive plan, blending innovative ideas with practical solutions to bring your project to life with precision and creativity.",
        image: "",
      },
      {
        number: "03",
        title: "Design Excellence",
        description:
          "We transform concepts into captivating designs, balancing aesthetics with functionality to create spaces that inspire and endure.",
        image: "",
      },
      {
        number: "04",
        title: "Perfect Execution",
        description:
          "Every project is executed with utmost care, ensuring flawless results that exceed expectations and bring your vision to reality.",
        image: "",
      },
    ],
  },
  contact: {
    title: "We love meeting new people\nand helping them.",
    email: "info@yourdomain.com",
    phone: "+91 98257 39499",
    website: "www.yourdomain.com",
  },
};

export async function GET(request, { params }) {
  const { page } = await params;
  try {
    await dbConnect();
    const doc = await SiteContent.findOne({ page });
    const content = doc ? doc.content : (defaultContent[page] ?? {});
    return NextResponse.json({ success: true, data: content }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error fetching content" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { page } = await params;
  try {
    await dbConnect();
    const body = await request.json();
    const doc = await SiteContent.findOneAndUpdate(
      { page },
      { content: body, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, data: doc.content }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error updating content" },
      { status: 500 }
    );
  }
}
