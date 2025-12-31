import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthServices } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategies";
import { UserModule } from "src/user/users.module";


@Module({
    imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
        secret: 'JWT_SECRET_KEY',
        signOptions: {expiresIn: '1h'}
    }),
],
controllers:[AuthController],
providers:[AuthServices, JwtStrategy],
exports:[PassportModule, JwtModule]
})

export class AuthModule{}