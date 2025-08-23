import 'express';

import { SessionUser } from '@/user/types';

declare module 'express' {
  interface Request {
    user?: SessionUser;
  }
}
