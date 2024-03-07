import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  UsePipes,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterUserUseCase } from '@/domain/blog/application/use-cases/register-user'
import { UserAlreadyExistsError } from '@/domain/blog/application/use-cases/errors/user-already-exists'

const createrAccountBodySchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createrAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(
    // private prismaService: PrismaService
    private registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createrAccountBodySchema))
  async createAccount(@Body() body: CreateAccountBodySchema) {
    const { email, password, userName } = body

    const result = await this.registerUserUseCase.execute({
      email,
      password,
      userName,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

  }
}
