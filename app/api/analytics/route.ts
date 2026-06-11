import org from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ data: "ID IS REQUIREED" }, { status: 400 });
    }
    const res = await org.analytics.findMany({
      where: { userId: id },
      include: {
        snippets: {
          select: {
            fileName: true,
            codeLang: true,
            code: true,
            createdAt: true,
          }
        }
      }
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    console.log(e);
    
    return NextResponse.json({ data: e }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      binId,
      language,
      userId,
      key_improvements,
      Mistakes,
      things_to_learn,
      code_rating,
      enhance_suggestion,
      enhance_code,
    } = await req.json();

    if (
      !binId &&
      !language &&
      !userId &&
      !key_improvements &&
      !Mistakes &&
      !things_to_learn &&
      !code_rating &&
      !enhance_suggestion &&
      !enhance_code
    ) {
      return NextResponse.json(
        { message: "Not All Data is provided" },
        { status: 400 }
      );
    }

    const save = await org.analytics.create({
      data: {
        binId,
        language,
        userId,
        key_improvements,
        Mistakes,
        things_to_learn,
        code_rating,
        enhance_suggestion,
        enhance_code,
      },
    });
    if (save) {
      return NextResponse.json({ data: save }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ data: "ID IS REQUIREED" }, { status: 400 });
    }
    const res = await org.analytics.delete({
      where: { id: id },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}