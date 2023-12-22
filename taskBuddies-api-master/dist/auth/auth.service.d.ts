import { SignupAuthDto } from './dto/signup-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(signupAuthDto: SignupAuthDto): Promise<import("../user/entities/user.entity").UserEntity>;
    signin(signinAuthDto: SigninAuthDto): Promise<{
        jwtToken: string;
    }>;
    validateUser(signinAuthDto: SigninAuthDto): Promise<import("../user/entities/user.entity").UserEntity>;
    generateJwtToken(payload: any): string;
}
