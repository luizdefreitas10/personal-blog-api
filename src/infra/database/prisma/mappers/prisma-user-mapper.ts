import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/blog/enterprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(rawUser: PrismaUser): User {
    return User.create(
      {
        userName: rawUser.userName,
        email: rawUser.email,
        password: rawUser.password,
      },
      new UniqueEntityID(rawUser.id),
    )
  }

  static toPersistance(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      userName: user.email,
      email: user.email,
      password: user.password,
    }
  }
}
