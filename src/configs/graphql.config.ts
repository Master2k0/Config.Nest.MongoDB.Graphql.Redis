import { Injectable } from '@nestjs/common';
import {ApolloDriverConfig} from '@nestjs/apollo';
import { GqlOptionsFactory} from '@nestjs/graphql';
import {join} from 'path';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<ApolloDriverConfig>{
        return {
            cors: {
                origin: ["url want pass CORS"],
                credentials: true,
            },
            debug: false,
            // context: ({ req, res }) => ({ req, res }), // I don't know how line is work
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Save all schema generator to file schema.gql
            subscriptions: {
                'graphql-ws': true
            }, //Open subscription for assign protocol between client and server. Just like websocket
            sortSchema: true,
            csrfPrevention: true, //Prevent CSRF and XS-Search attack
            cache: 'bounded', //Cache all request to server
            formatError: (error: any) => {
                // Graphql Error
                const formattedError = {
                  message: error.message,
                  code: error?.extensions?.code || 'INTERNAL_SERVER_ERROR',
                };
        
                const extensions = error?.extensions || null;
                // Http exception
                if (extensions?.exception?.status) {
                  formattedError['statusCode'] = extensions.exception.status || 500;
                  delete formattedError.code;
        
                  // Class Validator Error
                } else if (extensions?.response?.statusCode) {
                  const response = extensions.response;
                  formattedError.message = response?.message || error.message;
                  formattedError['statusCode'] = response?.statusCode || 500;
                  delete formattedError.code;
        
                  // Mongo Error
                  // 1. Duplicate document by index
                } else if (
                  extensions?.exception?.code === 11000 ||
                  error.message.match(/E11000/)
                ) {
                  formattedError.message = 'Duplicate document';
                  formattedError['statusCode'] = 409;
                  delete formattedError.code;
                }
        
                return formattedError;
              },
        }
    }
}