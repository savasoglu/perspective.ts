export default class PerspectiveClient {
    key;
    apiUrl;
    constructor(apiKey) {
        this.key = apiKey;
        this.apiUrl = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.key}`;
    }
    async fetchAPI(url, requestBody) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(`[${data.error.status}] ${data.error.message}`);
        }
        return data;
    }
    createRequestBody(comment) {
        return {
            comment: { text: comment },
            requestedAttributes: {
                TOXICITY: {},
                SEVERE_TOXICITY: {},
                IDENTITY_ATTACK: {},
                INSULT: {},
                PROFANITY: {},
                THREAT: {},
            },
        };
    }
    async analyzeComment(comment) {
        const requestBody = this.createRequestBody(comment);
        const data = await this.fetchAPI(this.apiUrl, requestBody);
        return data;
    }
}
