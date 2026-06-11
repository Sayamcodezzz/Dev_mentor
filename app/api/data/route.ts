import org from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ data: "ID IS REQUIREED" }, { status: 400 });
    }
    const res = await org.bin.findUnique({
      where: { id: id },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: e }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ data: "ID IS REQUIREED" }, { status: 400 });
    }
    await org.bin.delete({
      where: { id: id },
    });
    return NextResponse.json({ data: "OK" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, code, fileName } = await req.json();
    console.log(id, code);
    
    if (!code && !id) {
      return NextResponse.json({ data: "Provide all data" }, { status: 400 });
    }
    const res = await org.bin.update({
      where: { id },
      data: {
        code: code,
        fileName: fileName
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); 

    const { codeLang, code, fileName } = await req.json();
    if (!code && !codeLang) {
      return NextResponse.json({ data: "Provide all data" }, { status: 400 });
    }
    
    if (id) {
    const res = await org.bin.create({
      data: {
        code: code,
        codeLang: codeLang,
        userId: id,
        fileName: fileName
      },
      select: {
        id: true,
        createdAt: true,
      }
    });
    
    return NextResponse.json({ data: res, add: `Added to ${id}` }, { status: 200 });
}

    const res = await org.bin.create({
      data: {
        code: code,
        codeLang: codeLang,
        fileName: fileName
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { data: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}
