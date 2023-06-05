import PerspectiveClient from './index';

describe('test analyzeComment', () => {
	expect(process.env.API_KEY).toBeDefined();

	const client = new PerspectiveClient(process.env.API_KEY as string);

	test('toxicity', async () => {
		const comment = 'ur so stupid';
		const response = await client.analyzeComment(comment);

		expect(response.attributeScores.TOXICITY?.summaryScore.value).toEqual(0.90451443);
	});

	test('threat', async () => {
		const comment = 'i will steal ur crayons';
		const response = await client.analyzeComment(comment);

		expect(response.attributeScores.THREAT?.summaryScore.value).toEqual(0.5252479);
	});
});
