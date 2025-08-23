import 'express-session';

import { SessionUser } from '@/user/types';

declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: SessionUser;
    };
  }
}
