import { BsaConfig } from "./config.js";
import { request, RequestMethod } from "./request.js";

export async function qrAuthenticationRequest() {
    return await request(BsaConfig.api_url + "/api/v3/qr/generate", RequestMethod.POST, {
    }, {
        "Content-Type": "Application/json"
    },  "?clientKey=" + BsaConfig.clientKey + "&authPlatform=CMMAPF001")
}

export async function qrCheckAuthenticationStatus(qrId) {
    return await request(BsaConfig.api_url + "/api/v3/app/qr/websocket", RequestMethod.GET, {}, {
        "Content-Type": "Application/json"
    }, "?qrId=" + qrId)
}
