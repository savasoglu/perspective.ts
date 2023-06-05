interface AnalyzeCommentRequestBody {
	comment: { text: string };
	requestedAttributes: {
		[attribute: string]: {};
	};
}

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
	private readonly key: string;
	private readonly apiUrl: string;

	public constructor(apiKey: string) {
		this.key = apiKey;
		this.apiUrl = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.key}`;
	}

	private async fetchAPI<TRequest, TResponse>(url: string, requestBody: TRequest): Promise<TResponse> {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody),
		});

		const data = await response.json();
		if (data.error) {
			throw new Error(`[${data.error.status}] ${data.error.message}`);
		}
		return data as TResponse;
	}

	private createRequestBody(comment: string): AnalyzeCommentRequestBody {
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

	async analyzeComment(comment: string): Promise<AnalyzeCommentResponse> {
		const requestBody = this.createRequestBody(comment);
		const data = await this.fetchAPI<AnalyzeCommentRequestBody, AnalyzeCommentResponse>(this.apiUrl, requestBody);
		return data;
	}
}
