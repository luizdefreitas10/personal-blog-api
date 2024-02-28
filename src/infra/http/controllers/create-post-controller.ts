import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { TokenBodySchema } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'

const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreatePostBodySchema = z.infer<typeof createPostBodySchema>

@Controller('/posts')
@UseGuards(JwtAuthGuard)
export class CreatePostController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  async createPost(
    @Body(new ZodValidationPipe(createPostBodySchema))
    body: CreatePostBodySchema,
    @CurrentUser() user: TokenBodySchema,
  ) {
    const { content, title } = body

    const authorId = user.sub

    await this.prismaService.post.create({
      data: {
        content,
        title,
        authorId,
      },
    })
  }
}
