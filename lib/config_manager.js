"use strict";

let check_config = function(configuration){
    return configuration
        && configuration.name
        && configuration.user_id
};

module.exports = {
    isConfigValid : check_config
};