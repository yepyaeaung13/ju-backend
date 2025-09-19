import { LoginInput, RegisterInput, SocialLoginInput } from './auth.schema';
import { UserRepository } from '../user/user.repository';
import { signToken, signRefreshToken } from '../../utils/jwt';
import { hashPassword, comparePassword } from '../../utils/password';
import axios from 'axios';

export class AuthService {
  constructor(private userRepo: UserRepository) { }


  async login(data: LoginInput) {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user || !(await comparePassword(data.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return {
      accessToken: signToken({ userId: user.id }),
      refreshToken: signRefreshToken({ userId: user.id }),
    };
  }

  async register(data: RegisterInput) {
    const hashed = await hashPassword(data.password);
    const user = await this.userRepo.create({ ...data, password: hashed, login_type: 'normal' });
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken: signToken({ userId: user.id }),
      refreshToken: signRefreshToken({ userId: user.id }),
    };
  }

  async loginWithSocial(data: SocialLoginInput) {
    let loginUser: { name: string; email: string; picture: string; } |undefined = undefined;
    const token = data.idToken.trim();

    // start verify and get user info
    if (data.provider === 'google') {
      // Verify Google token
      try {
        const googleRes = await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
        );
        console.log("googleResponse", googleRes)
        loginUser = googleRes.data;
      } catch (err) {
        console.log("googleResponse", err)
        throw new Error('Invalid Google access token');
      }
    } else if (data.provider === 'facebook') {
      // Verify Facebook token
      try {
        // Step 1: Get user info from Facebook Graph API
        const fbRes = await axios.get(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        );
        loginUser = fbRes.data;
      } catch (err) {
        throw new Error('Invalid Facebook access token');
      }
    }
    // end verify and get user info

    if (!loginUser?.email) throw new Error('Invalid social login: email not found');

    let user = await this.userRepo.findByEmail(loginUser.email);
    // If user does not exist, create new user
    if (!user) {
      user = await this.userRepo.create({ email: loginUser.email, name: loginUser.name, password: '', picture: loginUser.picture, login_type: data.provider });
    }
    
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      accessToken: signToken({ userId: user.id }),
      refreshToken: signRefreshToken({ userId: user.id }),
    };
  }
}
