import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user-repository'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterUserUseCaseRequest {
  userName: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    userName,
    password,
    email,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      email,
      userName,
      password: hashedPassword,
    })

    await this.usersRepository.createUser(user)

    return right({
      user,
    })
  }
}
