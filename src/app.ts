declare module 'fastify' {
	interface FastifyRequest {
		user?: any;
	}
}
import { registerSwagger } from './docs/swagger';
import { authRoutes } from './modules/auth/auth.routes';
import { productRoutes } from './modules/product/product.routes';
import { errorMiddleware } from './middleware/error.middleware';
import cors from '@fastify/cors';

const app = require('fastify')({ logger: true });

async function setupApp() {
	await app.register(cors, {
		origin: '*', // You can restrict this to specific origins if needed
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	});
	await registerSwagger(app);
	app.setErrorHandler(errorMiddleware);
	await app.register(authRoutes, { prefix: '/api/v1' });
	// await app.register(productRoutes, { prefix: '/api/v1' });
	return app;
}

export default app;
export { setupApp };
