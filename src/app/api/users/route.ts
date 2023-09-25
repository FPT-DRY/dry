import { passwordSalt } from '@features/authentication/lib';
import {
  UserResponse,
  UserUpsertRequest,
} from '@features/authentication/model/user';
import { ModelVaidation } from '@lib/helper';
import { apiHandler } from '@lib/http';
import prisma from '@lib/prisma';
import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

async function findUsers(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const pageNumber = Number(searchParams.get('page')) || 0;
  const pageSize = Number(searchParams.get('limit')) || 10;

  const users = await prisma.user.findMany({
    take: pageSize,
    skip: pageNumber * pageSize,
  });

  return NextResponse.json(users);
}

async function createUser(req: NextRequest) {
  const modelVaidation = new ModelVaidation<UserUpsertRequest>({
    schema: {
      required: ['username', 'password', 'name', 'email'],
    },
  });

  const body = await req.json();
  const dto = modelVaidation.validate(body, new UserUpsertRequest(body));

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
