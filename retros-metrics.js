import * as urlTransformer from "./url-transformer.js";
import * as queries from "./gh-queries.js";
import * as apiCaller from "./api-caller.js";

const flatten = async (from, to) => {
	const items = [];

	const openedIssues = await apiCaller.queryIssuesOrPrs(
		queries.openedIssues(from, to)
	);
	const closedIssues = await apiCaller.queryIssuesOrPrs(
		queries.closedIssues(from, to)
	);
	const openedPRs = await apiCaller.queryIssuesOrPrs(
		queries.openedPRs(from, to)
	);
	const mergedPRs = await apiCaller.queryIssuesOrPrs(
		queries.mergedPRs(from, to)
	);
	const closedPRs = await apiCaller.queryIssuesOrPrs(
		queries.closedPRs(from, to)
	);

	items.push(iterate(openedIssues, "issue"));
	items.push(iterate(closedIssues, "issue"));
	items.push(iterate(openedPRs, "pr"));
	items.push(iterate(mergedPRs, "pr"));
	items.push(iterate(closedPRs, "pr"));

	return items.flat();
};

const iterate = (apiResult, type) => {
	const { data } = apiResult;
	const { items } = data;

	const result = [];

	items.forEach((element) => {
		result.push({
			repoName: urlTransformer.getRepoName(element.repository_url),
			repoUrl: element.repository_url,
			number: element.number,
			title: element.title,
			type: type,
			itemUrl: element.url,
		});
	});
	return result;
};

export const toArray = async (from, to) => {
	const items = await flatten(from, to);
	const result = [];
	items.forEach((element) => {
		result.push(
			generateMarkdown(
				element.repoName,
				element.repoUrl,
				element.number,
				element.title,
				element.type,
				element.itemUrl
			)
		);
	});
	return result;
};

const generateMarkdown = (repoName, repoUrl, number, title, type, itemUrl) => {
	return `[${repoName}](${repoUrl}) ${title} [${
		type == "issue" ? "Issue" : "PR"
	}-${number}](${itemUrl})`;
};
