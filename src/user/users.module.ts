import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UsersServices } from "./users.service";
import { UserController } from "./users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],   
  providers: [UsersServices],        
  exports: [UsersServices],           
})
export class UserModule {}
