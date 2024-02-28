import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate-controller'
import { CreateAccountController } from './controllers/create-account-controller'
import { CreatePostController } from './controllers/create-post-controller'
import { FetchPostsController } from './controllers/fetch-posts-controller'
import { PrismaService } from '../database/prisma/prisma.service'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreatePostController,
    FetchPostsController,
  ],
})
export class HttpModule {}
