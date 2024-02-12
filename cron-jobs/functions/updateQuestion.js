export async function updateQuestion() {
    const apiUrl = process.env.NEW_QUESTION_URL
    const response = await fetch(apiUrl)
    const body = await response.json()
    console.log(body)
}