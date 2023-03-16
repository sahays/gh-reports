import * as queries from "./gh-queries.js";
import * as apiCaller from "./api-caller.js";
import * as cliReader from "./cli-reader.js";
import * as urlTransformer from "./url-transformer.js";

const generateMarkdown = (repoName, repoUrl, number, title, type, itemUrl) => {
	return `[${repoName}](${repoUrl}) ${title} [${
		type == "issue" ? "Issue" : "PR"
	}-${number}](${itemUrl})`;
};

const from = cliReader.getFromValue();
const to = cliReader.getToValue();

const getMetrics = async (from, to) => {
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

	return {
		openedIssues: openedIssues.data.total_count,
		closedIssues: closedIssues.data.total_count,
		openedPRs: openedPRs.data.total_count,
		mergedPRs: mergedPRs.data.total_count,
		closedPRs: closedPRs.data.total_count,
	};
};

const openedPRs = await apiCaller.queryIssuesOrPrs(queries.openedPRs(from, to));
const openedIssues = await apiCaller.queryIssuesOrPrs(
	queries.openedIssues(from, to)
);
console.log(urlTransformer.getPermaLink(openedPRs.url));
console.log(urlTransformer.getPermaLink(openedIssues.url));

// console.log(await getMetrics(from, to));

// const { data } = await apis.queryIssuesOrPrs(
// 	queries.openedIssues(cli.getFromValue(), cli.getToValue())
// );
// const { total_count, items } = data;

// console.log(total_count);
// const item = items[0];
// const repoParts = item.repository_url.split("/");
// const repoName = repoParts[repoParts.length - 1];
// console.log(
// 	generateMarkdown(
// 		repoName,
// 		item.repository_url,
// 		item.number,
// 		item.title,
// 		"issue",
// 		item.url
// 	)
// );
