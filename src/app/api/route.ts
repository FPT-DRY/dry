import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      database: {
        url: process.env.DATABASE_URL,
      },
    },
    { status: 200 }
  );
}
