interface SpanScore {
    begin: number;
    end: number;
    score: {
        value: number;
        type: string;
    };
}
interface AttributeScore {
    spanScores: SpanScore[];
    summaryScore: {
        value: number;
        type: string;
    };
}
interface AnalyzeCommentResponse {
    attributeScores: {
        TOXICITY?: AttributeScore;
        IDENTITY_ATTACK?: AttributeScore;
        PROFANITY?: AttributeScore;
        INSULT?: AttributeScore;
        SEVERE_TOXICITY?: AttributeScore;
        THREAT?: AttributeScore;
    };
    languages: string[];
    detectedLanguages: string[];
}
export default class PerspectiveClient {
    private readonly key;
    private readonly apiUrl;
    constructor(apiKey: string);
    private fetchAPI;
    private createRequestBody;
    analyzeComment(comment: string): Promise<AnalyzeCommentResponse>;
}
export {};
