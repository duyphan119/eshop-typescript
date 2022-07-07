import { GetUSer } from './../auth/decorator/get-user.decorator';
import { UserService } from './user.service';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { NewPasswordDto, UpdateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @Patch()
  update(@GetUSer('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Patch('change-password')
  @UseGuards(JwtGuard)
  changePassword(@GetUSer('id') id: number, @Body() dto: NewPasswordDto) {
    return this.userService.changePassword(id, dto);
  }
}
