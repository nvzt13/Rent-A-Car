import { prisma } from "../prisma";
import { Admin } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);


export async function create(data: Admin) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log("data:" + data)
  const newAdmin = await prisma.admin.create({
    data: {
      name: data.name,
      password: hashedPassword,
    },
  });

  return {
    id: newAdmin.id,
    name: newAdmin.name,
  }; // Şifreyi return etme!
}

export async function login({ name, password }: { name: string, password: string }) {
  const admin = await prisma.admin.findFirst({
    where: { name },
  });

  if (!admin) {
    throw new Error("Kullanıcı bulunamadı");
  }

  const isPasswordCorrect = await bcrypt.compare(password, admin.password);
  if (!isPasswordCorrect) {
    throw new Error("Şifre yanlış");
  }

  const token = await new SignJWT({
    id: admin.id,
    userName: admin.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(JWT_SECRET);

  return { token };
}

export async function getAdmin () {
    const admin = await prisma.admin.findFirst({
      select: {
        id: true,
        name: true,
      },
    });
  
    return admin;
  }


