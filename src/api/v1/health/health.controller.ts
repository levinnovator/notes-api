import { Database } from '@services';

class HealthController {
  public static isAccessible = () => Database.connection.isInitialized;
}

export default HealthController;
