import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PersistenceModule } from "./adapters/persistence.module";
import { MoviesModule } from "./application/movies/movies.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PersistenceModule,
    MoviesModule,
  ],
})
export class AppModule {}