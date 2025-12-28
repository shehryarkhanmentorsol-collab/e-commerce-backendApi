import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthServices } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";


@Module({
    imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
        secret: 'JWT_SECTER_KEY',
        signOptions: {expiresIn: '1h'}
    }),
],
providers:[AuthServices],
controllers:[AuthController]
})

export class AuthModule{}