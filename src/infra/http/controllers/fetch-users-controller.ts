import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchUsersUseCase } from '@/domain/blog/application/use-cases/fetch-users'
import { UserPresenter } from '../presenters/http-user-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/accounts')
export class FetchUsersController {
  constructor(private fetchUsersUseCase: FetchUsersUseCase) {}

  @Get()
  async getUsers(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchUsersUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const users = result.value.users

    return { users: users.map(UserPresenter.toHTTP) }
  }
}
