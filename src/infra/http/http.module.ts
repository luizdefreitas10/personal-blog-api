import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate-controller'
import { CreateAccountController } from './controllers/create-account-controller'
import { CreatePostController } from './controllers/create-post-controller'
import { FetchPostsController } from './controllers/fetch-posts-controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterUserUseCase } from '@/domain/blog/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { FetchUsersController } from './controllers/fetch-users-controller'
import { FetchUsersUseCase } from '@/domain/blog/application/use-cases/fetch-users'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreatePostController,
    FetchPostsController,
    FetchUsersController
  ],
  providers: [
    RegisterUserUseCase,
    FetchUsersUseCase,
  ],
})
export class HttpModule {}
