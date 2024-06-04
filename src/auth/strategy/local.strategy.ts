import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private userService:UserService){
        super({
            usernameField:'email',
            passportField:'password',
    })
    }
   async validate(email:string, password:string):Promise<User>{
      const user : User=await this.userService.findUserByEmail(email);
      console.log(user);
      if(user && user.password==password)return user;
      if(user==undefined)throw new UnauthorizedException("User not found:" + email);
       if(user.password!=password) throw new UnauthorizedException("invalid password")
   
    }



}