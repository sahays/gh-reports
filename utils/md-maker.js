export const lineItem = (number, title, isType, itemUrl, status) => {
	return `${status.toUpperCase()} ${title} [${
		isType == "issue" ? "Issue" : "PR"
	}-${number}](${itemUrl})`;
};

export const row = (count, query, baseUrl, queryLabel) => {
	return `${queryLabel} [${count}](${baseUrl}?q=${query})`;
};

export const h1 = (title) => {
	return `## ${title}`;
};

export const h2 = (title) => {
	return `### ${title}`;
};
