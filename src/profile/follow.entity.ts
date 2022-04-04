import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsNumber } from 'class-validator'

@Entity({ name: 'follows' })
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNumber()
    followerId: number

    @Column()
    @IsNumber()
    followingId: number
}
