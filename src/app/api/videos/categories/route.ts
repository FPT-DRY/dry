import { apiHandler } from '@lib/http';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function getCategoryList(request: NextRequest, response: NextResponse) {
  const categories = await prisma.category.findMany();

  return NextResponse.json(categories);
}

module.exports = apiHandler({
  GET: getCategoryList,
});
