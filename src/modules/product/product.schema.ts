import { Static, Type } from '@sinclair/typebox';

export const ProductParamsSchema = Type.Object({
  id: Type.String({ minLength: 1 }),
});
export type ProductParams = Static<typeof ProductParamsSchema>;

export const ProductBodySchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  price: Type.Number({ minimum: 0 }),
  description: Type.Optional(Type.String()),
});
export type ProductBody = Static<typeof ProductBodySchema>;
