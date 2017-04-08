// ==================================================
// Configuration
// ==================================================
// This file contains all configuration for almost
// everything. This is the recommended way to organize
// oauth keys, and so on; not required.
// ==================================================

export default {
  // ==============================
  // Google Oauth Configuration
  // ==============================
  google: {
    clientId: '',
    clientSecret: '',
    domain: ''
  },

  // ==============================
  // Assets
  // ==============================
  //
  // Configuration for assets and paths
  //
  assets: {
    images: process.env.ASSET_IMAGE_PATH || '/img'
  },

  // ==============================
  // App-related configuration
  // ==============================
  app: {
    title: 'Uomi',

    meta: {
      description: '',
      keywords: ''
    }
  }
};
