import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServices{
    constructor(@InjectRepository(User) private readonly UserRepo: Repository<User>,
    private readonly jwtServices: JwtService){}

    async login(email: string, password: string){
        const user = await this.UserRepo.findOne({where: {email},
        })
        if(!user){
            throw new UnauthorizedException("Invalid credentials")
        }

    
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        return{
            accessToken: this.jwtServices.sign(payload)
        }
    }
}