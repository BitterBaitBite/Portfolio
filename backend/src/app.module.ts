import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ProjectsModule } from "./projects/projects.module";
import { TagsModule } from "./tags/tags.module";
import { AboutModule } from "./about/about.module";
import { ContactModule } from "./contact/contact.module";
import { CurriculumVitaeModule } from "./curriculum-vitae/curriculum-vitae.module";
import { NewsModule } from "./news/news.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true, ttl: 300 * 1000 }), // Cache for 5 minutes default (does not affect the @CacheTTL decorator)
    PrismaModule,
    AuthModule,
    ProjectsModule,
    NewsModule,
    TagsModule,
    AboutModule,
    ContactModule,
    CurriculumVitaeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
