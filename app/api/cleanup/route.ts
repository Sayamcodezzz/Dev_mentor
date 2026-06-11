import { NextResponse } from 'next/server';
import { deleteBins } from '@/lib/deleteData'; // adjust path

export async function GET() {
  const result = await deleteBins();
  return NextResponse.json(result);
}

