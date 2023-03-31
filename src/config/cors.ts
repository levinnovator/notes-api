import { CorsOptions } from 'cors';

const allowlist = ['http://localhost:3000'];

/**
 * CORS config.
 */
const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowlist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin is not in the allowed list'));
    }
  },
};

export default corsConfig;
