const config = {
    apiKey: {
      doc: "NIN API Key",
      format: "*",
      default: null,
      env: "NIN_API_KEY",
      sensitive: true,
    },
    shortCode: {
      doc: "NIN short code",
      format: "*",
      default: null,
      env: "NIN_SHORT_CODE",
      sensitive: true,
    },
    userID: {
      doc: "NIN User ID",
      format: "*",
      default: null,
      env: "NIN_USERID",
      sensitive: false,
    },
    agentID: {
      doc: "NIN agent ID",
      format: "*",
      default: null,
      env: "NIN_AGENTID",
      sensitive: false,
    },
    vninGenerationUrl: {
        doc: "vNIN generation url",
        format: "*",
        default: null,
        env: "VNIN_GENERATION_URL",
        sensitive: false,
      },

      vninVerificationUrl: {
        doc: "vNIN verification url",
        format: "*",
        default: null,
        env: "VNIN_VERIFICATION_URL",
        sensitive: false,
      },
    
  };
  
  exports.nin = config;
  