import Constants from 'expo-constants';

const { manifest } = Constants;

const env = {
  dev: {
    apiUrl: `http://${manifest.debuggerHost.split(':').shift()}:8000`,
  },
};

export default env;
