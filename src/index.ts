import type { ValueParts } from '@getbeak/types/values';
import type { EditableRealtimeValue } from '@getbeak/types-realtime-value';

interface Payload {
	value: ValueParts;
}

const extension: EditableRealtimeValue<Payload, Payload> = {
	name: 'Square root',
	description: 'Calculates the square root of a number.',
	sensitive: false,
	attributes: {
		requiresRequestId: false,
	},

	createDefaultPayload: async () => ({ value: [] }),
	getValue: async (ctx, payload, recursiveSet) => {
		// Use the BeakAPI to take the array of value parts, and parse them into a string
		const parsed = await beakApi.parseValueParts(ctx, payload.value, recursiveSet);

		// Take the parsed string and convert it to an integer
		const integer = parseInt(parsed, 10) || 0;

		// Calculate the square root
		return Math.sqrt(integer).toString(10);
	},

	editor: {
		createUserInterface: async () => [{
			type: 'value_parts_input',
			stateBinding: 'value',
			label: 'What do you want to square root?',
		}],

		load: async (_ctx, payload) => payload,
		save: async (_ctx, _existingPayload, state) => state,
	},
};

export default extension;
