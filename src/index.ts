import type { EditableRealtimeValue } from '@getbeak/types-realtime-value';
import lyrics from './lyrics.json';

const lyricCount = lyrics.length;

interface Payload {
	paragraphs: number;
}

const extension: EditableRealtimeValue<Payload, Payload> = {
	name: 'Lorem Swiftsum',
	description: 'Generate some Lorem Ipsum style placeholder content, Taylor Swift inspired.',
	sensitive: false,
	attributes: { requiresRequestId: false },

	createDefaultPayload: async () => ({ paragraphs: 1 }),
	getValue: async (_ctx, payload) => {
		const paragraphs: string[] = [];

		for (let i = 0; i < payload.paragraphs; i++) {
			const sentences = getRandomInteger(6, 11);
			const paragraph: string[] = [];

			for (let j = 0; j < sentences; j++)
				paragraph.push(lyrics[getRandomInteger(0, lyricCount)]);

			paragraphs.push(paragraph.join('. '));
		}

		return paragraphs.join('\n\n');
	},

	editor: {
		createUserInterface: async () => [{
			type: 'number_input',
			stateBinding: 'paragraphs',
			label: 'How many paragraphs do you want to generate?',
		}],

		load: async (_ctx, payload) => payload,
		save: async (_ctx, _existingPayload, state) => state,
	},
};

function getRandomInteger(inclusiveMin: number, exclusiveMax: number) {
	return Math.floor(Math.random() * (exclusiveMax - inclusiveMin) + inclusiveMin);
}

export default extension;
