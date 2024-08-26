import { authenticationRequest, checkAuthenticationStatus, getAuthenticationResult } from "../lib/bsa/authenticationUserID.js";

const userInput = document.getElementById("user_id");
const validateBtn = document.getElementById("submit_btn");
const errorMessage1 = document.getElementById("error-1");
const progressBar = document.getElementById("progress");
const waitText = document.getElementById("wait");
const form = document.getElementById("form");

let currentStep = 0;
let authenticationRequestResult = {};

validateBtn.addEventListener("click", async () => {
    waitText.classList.remove("hide");
    validateBtn.classList.add("hide");
    authenticationRequestResult = await authenticationRequest(userInput.value);
    console.log(authenticationRequestResult);
    if (authenticationRequestResult.rtCode == 2008) {
        errorMessage1.innerHTML = "Unregistered Device";
        waitText.classList.add("hide");
        validateBtn.classList.remove("hide");
    } else if (authenticationRequestResult.rtCode == 0) {
        currentStep = 1;
        form.classList.add("hide");
        progressBar.classList.remove("hide");
        waitText.classList.add("hide");
        check()
    } else {
        waitText.classList.add("hide");
        validateBtn.classList.remove("hide");
    }
})

function check() {
    console.log(authenticationRequestResult);
    var refreshIntervalId = setInterval(async () => {
        const result = await checkAuthenticationStatus(authenticationRequestResult.data.userKey, authenticationRequestResult.data.channelKey)
        if (result.rtCode == 0) {
            clearInterval(refreshIntervalId)
            const result1 = await getAuthenticationResult(authenticationRequestResult.data.userKey, authenticationRequestResult.data.channelKey)
            console.log(result1);
            localStorage.setItem("bank-305-token", result1.data);
            location.href = "/home/index.html";
        }
    }, 2000)
}

