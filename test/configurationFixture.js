"use strict";

var assert = require('chai').assert;
var configManager = require('../lib/config_manager');

function getConfiguration(transformationFunction){
    let defaultConfig = {
        name: "John",
        user_id: "Johny123123",
        application: "TestApplication"
    };

    if(transformationFunction){
        defaultConfig = transformationFunction(defaultConfig);
    }
    return defaultConfig;
};

function configPropertyCanNotBeUndefined(configTransformationFunction){
    let configuration = getConfiguration(conf => configTransformationFunction);

    let checkResult = configManager.isConfigValid(configuration);

    assert.notOk(checkResult);
}

describe("ConfigurationManager", () => {
    describe("isConfigValid", () => {
        it("Can not be undefined", () => {
            let checkResult = configManager.isConfigValid(undefined);

            assert.notOk(checkResult);
        });
        it("name can not be undefined", () => configPropertyCanNotBeUndefined(conf => conf.name = undefined));
        it("user_id can not be undefined", () => configPropertyCanNotBeUndefined(conf => conf.user_id = undefined));
        it("application can not be undefined", () => configPropertyCanNotBeUndefined(conf => conf.application = undefined));
        it("Valid configuration is valid", () => {
            let config = getConfiguration();

            let checkResult = configManager.isConfigValid(config);

            assert.ok(checkResult);
        })
    });
});