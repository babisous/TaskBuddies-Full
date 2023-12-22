import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    findAll(): string;
    signup(signupAuthDto: SignupAuthDto): Promise<import("../user/entities/user.entity").UserEntity>;
    signin(signinAuthDto: SigninAuthDto): Promise<{
        jwtToken: string;
    }>;
}
