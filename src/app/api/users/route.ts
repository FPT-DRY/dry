import { passwordSalt } from '@lib/auth';
import { ModelVaidation } from '@lib/helper';
import { PAGINATION, apiHandler } from '@lib/http';
import prisma from '@lib/prisma';
import { hash } from 'bcryptjs';
import { UserResponse, UserUpsertRequest } from 'model/user';
import { NextRequest, NextResponse } from 'next/server';

async function findUsers(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const pageNumber = Number(searchParams.get('page')) || 0;
  const pageSize =
    Number(searchParams.get('limit')) || PAGINATION.DEFAULT_PAGE_SIZE;

  const users = await prisma.user.findMany({
    take: pageSize,
    skip: pageNumber * pageSize,
  });

  return NextResponse.json(users);
}

async function createUser(req: NextRequest) {
  const modelVaidation = new ModelVaidation<UserUpsertRequest>();

  const body = await req.json();
  const dto = modelVaidation.validate(body, new UserUpsertRequest(body), {
    required: ['username', 'password', 'name', 'email'],
  });

  const user = await prisma.user.create({
    data: {
      username: dto.username,
      password: await hash(dto.password, passwordSalt),
      name: dto.name,
      email: dto.email,
      image: dto.image,
    },
  });

  const response = user as UserResponse;

  return NextResponse.json(response, {
    status: 201,
  });
}

module.exports = apiHandler({
  GET: findUsers,
  POST: createUser,
});
