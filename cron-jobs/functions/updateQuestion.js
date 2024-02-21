import {Config} from "../../config/config.js";
const config = new Config()

export async function updateQuestion() {
    const apiUrl = config.newQuestionURL()
    const response = await fetch(apiUrl)
    const body = await response.json()
    console.log(body)
}