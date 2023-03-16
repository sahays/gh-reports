const getArgValue = (argName) => {
	const argIndex = process.argv.indexOf(`--${argName}`);
	let argValue;

	if (argIndex > -1) {
		argValue = process.argv[argIndex + 1];
	}

	return argValue;
};

export const getFromValue = () => {
	const from = getArgValue("from");
	if (!from) throw "--from missing";

	return from;
};

export const getToValue = () => {
	const to = getArgValue("to");
	if (!to) throw "--to missing";

	return to;
};
