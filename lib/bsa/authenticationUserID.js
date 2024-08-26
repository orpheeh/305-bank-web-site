import { BsaConfig } from "./config.js";
import { request, RequestMethod } from "./request.js";

export async function authenticationRequest(userKey) {
    return await request(BsaConfig.api_url + "/api/v3/auth", RequestMethod.POST, {
        "clientKey": BsaConfig.clientKey,
        "userKey": userKey,
        "isOtpAuth": false,
        "authPlatform": "CMMAPF001"
    }, {
        "Content-Type": "Application/json"
    })
}

export async function checkAuthenticationStatus(userKey, channelKey) {
    return await request(BsaConfig.api_url + "/api/v3/app/websocket", RequestMethod.GET, {}, {
        "Content-Type": "Application/json"
    }, "?clientKey=" + BsaConfig.clientKey + "&channelKey=" + channelKey + "&userKey=" + userKey)
}


export async function getAuthenticationResult(userKey, channelKey) {
    return await request(BsaConfig.api_url + "/api/v3/auth", RequestMethod.GET, {}, {
        "Content-Type": "Application/json"
    }, "?clientKey=" + BsaConfig.clientKey + "&channelKey=" + channelKey + "&userKey=" + userKey)
}