import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

type CorsCallback = (err: Error | null, allow?: boolean) => void;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins: string[] = [
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
  ];

  app.enableCors({
    origin: (origin: string | undefined, callback: CorsCallback): void => {
      if (origin === undefined) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API internal Sinemaku')
    .setDescription('API Backend untuk aplikasi Sinemaku')
    .setVersion('1.0.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3002);
}

void bootstrap();
