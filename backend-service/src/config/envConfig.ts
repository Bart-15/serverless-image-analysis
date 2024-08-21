// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config().parsed;

interface ENV {
  IMAGE_ANALYSIS_BUCKET: string | undefined;
}

interface Config {
  IMAGE_ANALYSIS_BUCKET: string;
}

export const getConfig = (): ENV => {
  return {
    IMAGE_ANALYSIS_BUCKET: process.env.IMAGE_ANALYSIS_BUCKET,
  };
};

const getSanitezedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitezedConfig(config);

export default sanitizedConfig;
