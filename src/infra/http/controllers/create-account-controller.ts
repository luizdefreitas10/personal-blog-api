import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createrAccountBodySchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createrAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createrAccountBodySchema))
  async createAccount(@Body() body: CreateAccountBodySchema) {
    const { email, password, userName } = body

    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (userAlreadyExists) {
      throw new ConflictException('Email already exists.')
    }

    const hashRounds = 8

    const hashedPassword = await hash(password, hashRounds)

    await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
      },
    })
  }

  @Get()
  async getUsers() {
    const users = await this.prismaService.user.findMany()
    return {
      users,
    }
  }
}
