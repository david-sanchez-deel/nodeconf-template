import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment
dotenv.config();
dotenv.config({
  path: path.join(
    process.cwd(),
    'environments',
    `${(process.env.NODE_ENV || 'development')}.env`,
  ),
});

interface IEnvironment {
  env: string;
  port: number;
}

export const environment = {
  env:  process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,
} as IEnvironment;
