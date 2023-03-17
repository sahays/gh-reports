import { isValid } from "date-fns";

const argAvailable = (argName) => {
	const argIndex = process.argv.indexOf(`${argName}`);
	return argIndex > -1;
};

const getArgValue = (argName) => {
	const argIndex = process.argv.indexOf(`${argName}`);
	let argValue;

	if (argIndex > -1) {
		argValue = process.argv[argIndex + 1];
	}

	return argValue;
};

export const getFromValue = () => {
	const from = getArgValue("--from");
	if (!from) throw "--from missing";
	if (!isValid(new Date(from))) throw "invalid --from date";

	return from;
};

export const getToValue = () => {
	const to = getArgValue("--to");
	if (!to) throw "--to missing";
	if (!isValid(new Date(to))) throw "invalid --to date";

	return to;
};

export const getNoCache = () => {
	return argAvailable("--noCache");
};
