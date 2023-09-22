import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yosanai.angular.pos',
  appName: 'POS Starter',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
