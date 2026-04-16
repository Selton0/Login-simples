import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(name: string, password: string) {
    return this.prisma.user.create({
      data: { name, password },
    });
  }

  async login(name: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    if (!user) throw new Error('Usuário não existe');

    if (user.password !== password) {
      throw new Error('Senha errada');
    }

    return user;
  }

  async changePassword(name: string, oldPass: string, newPass: string) {
    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    if (!user) throw new Error('Usuário não existe');

    if (user.password !== oldPass) {
      throw new Error('Senha atual errada');
    }

    return this.prisma.user.update({
      where: { name },
      data: { password: newPass },
    });
  }
}