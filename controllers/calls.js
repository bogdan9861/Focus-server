const voipService = require("../services/voipService");

const sendCall = async (req, res) => {
  try {

    

  } catch (error) {
    console.error("Call initiation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to initiate call",
    });
  }
};

module.exports = {
  sendCall,
};
