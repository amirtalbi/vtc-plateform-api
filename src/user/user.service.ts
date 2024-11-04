import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from '../auth/dto/signup.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    // private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: SignupDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  // async sendWelcomeEmail(email: string): Promise<void> {
  //   const subject = 'Welcome to Our Service';
  //   const message = 'Thank you for signing up!';
  //   // await this.emailService.sendEmail(email, subject, message);
  // }

  async updateLastLogin(userId: number): Promise<void> {
    const user = await this.userModel.findOne({ _id: userId });
    if (user) {
      user.lastLogin = new Date();
      await user.save();
    }
  }
}
