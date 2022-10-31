import { Injectable } from "@nestjs/common";
import {
    ThrottlerOptionsFactory,
    ThrottlerModuleOptions
} from "@nestjs/throttler"

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    createThrottlerOptions()
    : Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions {
        return {
            limit: +process.env.THROTTLER_TTL,
            ttl: +process.env.THROTTLER_TTL,
            ignoreUserAgents: [
                /googlebot/gi,
                /bingbot/gi,
                /ia_archiver/gi,
                /facebot/gi,
            ]
        };
    };
}