import { Static, Type } from '@sinclair/typebox';

export const LoginSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
});
export type LoginInput = Static<typeof LoginSchema>;

export const RegisterSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 }),
  name: Type.String(),
  picture: Type.String(),
});
export type RegisterInput = Static<typeof RegisterSchema>;

export const SocialLoginSchema = Type.Object({
  provider: Type.Union([
    Type.Literal('google'),
    Type.Literal('facebook'),
  ]),
  idToken: Type.String(),
});
export type SocialLoginInput = Static<typeof SocialLoginSchema>;
