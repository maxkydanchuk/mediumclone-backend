import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { UserEntity } from '@app/user/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FollowEntity } from '@app/profile/follow.entity'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
    providers: [ProfileService],
    controllers: [ProfileController],
})
export class ProfileModule {}
