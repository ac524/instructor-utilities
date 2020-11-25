const validateParamsHandler = require("./validateParamsHandler");

const globalParamsValidation = validateParamsHandler({
    roomId: "objectID|optional",
    inviteId: "objectID|optional",
    feedId: "objectID|optional",
    studentId: "objectID|optional",
    appTypeId: "objectID|optional"
  });

  module.exports = globalParamsValidation;