import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose'
import { MongooseConfigService } from './configs/mongoose.config';
import { ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { GraphqlService } from './configs/graphql.config';
import { RedisClientOptions} from '@redis/client'

import * as redisStore from 'cache-manager-redis-store';
import { CacheConfigService } from './configs/cache.config';

@Module({
  imports: [
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    useClass: GraphqlService,
  }),
  
  MongooseModule.forRootAsync({
    useClass: MongooseConfigService
  }),

  CacheModule.registerAsync<RedisClientOptions>({

    isGlobal: true,
    useClass: CacheConfigService,
    // useFactory: async ( )
  })

],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
