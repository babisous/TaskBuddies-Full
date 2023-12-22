import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signupAuthDto: SignupAuthDto) {
    try {
      const userInDB = await this.userService.findByEmail(signupAuthDto.email);

      if (userInDB) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const newUser = await this.userService.create(signupAuthDto);

      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async signin(signinAuthDto: SigninAuthDto) {
    try {
      const user = await this.validateUser(signinAuthDto);

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const jwtToken = this.generateJwtToken(payload);

      return { jwtToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(signinAuthDto: SigninAuthDto) {
    const user = await this.userService.findByEmail(signinAuthDto.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const validPassword = await bcrypt.compare(
      signinAuthDto.password,
      user.password,
    );

    if (!validPassword) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  generateJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
