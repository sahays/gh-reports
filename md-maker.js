export const lineItem = (
	repoName,
	repoUrl,
	number,
	title,
	isType,
	itemUrl,
	status
) => {
	return `${status.toUpperCase()} [${repoName}](${repoUrl}) ${title} [${
		isType == "issue" ? "Issue" : "PR"
	}-${number}](${itemUrl})`;
};

export const row = (count, query, baseUrl) => {
	return `[${count}](${baseUrl}?q=${query})`;
};
