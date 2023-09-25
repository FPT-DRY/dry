import { apiHandler } from '@lib/http';
import prisma from '@lib/prisma';
import { HttpClientError, NextParams } from 'api';
import { NextRequest, NextResponse } from 'next/server';

type UserParams = {
  id: string;
};

async function findUserById(
  req: NextRequest,
  { params }: NextParams<UserParams>
) {
  const userId = params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    return NextResponse.json(user);
  } else {
    return HttpClientError.json({
      status: 400,
      name: 'Bad Request',
      message: `Not found any user with id '${userId}'`,
    });
  }
}

module.exports = apiHandler({
  GET: findUserById,
});
