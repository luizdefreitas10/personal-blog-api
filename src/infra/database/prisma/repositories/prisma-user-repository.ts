import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { UserRepository } from '@/domain/blog/application/repositories/user-repository'
import { User } from '@/domain/blog/enterprise/entities/user'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private prismaService: PrismaService) {
    super()
  }

  async createUser(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistance(user)

    await this.prismaService.user.create({
      data,
    })
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async getAllUsers({ page }: PaginationParams): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    // console.log(users)

    return users.map(PrismaUserMapper.toDomain)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
