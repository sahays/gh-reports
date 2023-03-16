const getIssuesUrl = (source) => {
	// source: https://api.github.com/search/issues?q=is%3Apull-request%20is%3Apublic%20created%3A2023-02-27..2023-03-10%20user%3Apartiql
	// target: https://github.com/issues?q=is%3Aissue+is%3Apublic+created%3A2023-02-27..2023-03-10+user%3Apartiql+
	const sourceParts = source.split("?");
	return `https://github.com/issues?${sourceParts[1]}`;
};
const getPRsUrl = (source) => {
	// source: https://api.github.com/search/issues?q=is%3Apull-request%20is%3Apublic%20created%3A2023-02-27..2023-03-10%20user%3Apartiql
	// target: https://github.com/pulls?q=is%3Apr+is%3Apublic+created%3A2023-02-27..2023-03-10+user%3Apartiql+
	const sourceParts = source.split("?");
	const queryPart = sourceParts[1].replace("pull-request", "pr");
	return `https://github.com/pulls?${queryPart}`;
};

export const toWebUrl = (source) => {
	if (source.indexOf("is%3Apull-request") > -1) return getPRsUrl(source);

	return getIssuesUrl(source);
};

export const toRepoUrl = (source) => {
	// from: https://api.github.com/repos/partiql/partiql-lang-kotlin
	// to: https://github.com/partiql/partiql-lang-kotlin
	return source.replace("api.", "").replace("/repos", "");
};

export const getRepoName = (fromUrl) => {
	const repoParts = fromUrl.split("/");
	return repoParts[repoParts.length - 1];
};
