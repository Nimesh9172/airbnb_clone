import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  const body = await request.json()
  const {email,name,password} = body

  const hashedPassword = await bcrypt.hash(password,12);

  const userExists = await prisma.user.findUnique({
    where:{
      email:email
    }
  })

  if (userExists){
    return NextResponse.json({message:'User already exists!'},{status:409})
  }

  const user = await prisma.user.create({
    data:{
      email,name,hashedPassword
    }
  });

  return NextResponse.json(user)

}