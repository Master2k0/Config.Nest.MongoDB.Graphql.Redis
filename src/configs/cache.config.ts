import {
    CacheModuleOptions,
    CacheOptionsFactory,
    Injectable,
  } from '@nestjs/common';
import { RedisClientOptions } from '@redis/client';
  import { CachingConfig } from 'cache-manager';
  import * as redisStore from 'cache-manager-redis-store';
//   import { RandomCodeEnum } from '../constants/enum';
//   import { randomCode } from '../utils/string.utils';
  @Injectable()
  export class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions<RedisClientOptions> {
      return {
        store: redisStore,
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        password: process.env.REDIS_PASSWORD,
        ttl: +process.env.CACHE_TTL, //Time to live - amount of time that a response is cached before it is deleted
        max: 1000,
        
      };
  }
}
//   export function customTTL(ttl?: number): CachingConfig {
//     if (!ttl) {
//       ttl = 1;
//     }
//     return {
//       ttl: +randomCode(3, RandomCodeEnum.NUMBER) + ttl,
//     };
//   }
  