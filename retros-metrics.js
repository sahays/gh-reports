import * as urlTransformer from "./url-transformer.js";
import * as queries from "./gh-queries.js";
import * as apiCaller from "./api-caller.js";
import * as mdMaker from "./md-maker.js";

const _results = [];

const getData = async (query, searchType, isType) => {
	const data = await apiCaller.queryIssuesOrPrs(query);
	data.query = query;
	data.searchType = searchType;
	data.isType = isType;
	return data;
};

const getResults = async (from, to) => {
	const openedIssues = await getData(
		queries.openedIssues(from, to),
		"issues",
		"issue"
	);
	const closedIssues = await getData(
		queries.closedIssues(from, to),
		"issues",
		"issue"
	);
	const openedPRs = await getData(queries.openedPRs(from, to), "pulls", "pr");
	const mergedPRs = await getData(queries.mergedPRs(from, to), "pulls", "pr");
	const closedPRs = await getData(queries.closedPRs(from, to), "pulls", "pr");

	_results.push(openedIssues);
	_results.push(closedIssues);
	_results.push(openedPRs);
	_results.push(mergedPRs);
	_results.push(closedPRs);
};

const list = async (from, to) => {
	const items = [];

	await getResults(from, to);

	items.push(iterate(_results[0]));
	items.push(iterate(_results[1]));
	items.push(iterate(_results[2]));
	items.push(iterate(_results[3]));
	items.push(iterate(_results[4]));

	return items.flat();
};

export const toTableSummary = () => {
	const result = [];
	_results.forEach((element) => {
		const { data, query, searchType } = element;
		const { total_count } = data;
		result.push(
			mdMaker.row(total_count, query, `https://github.com/${searchType}`)
		);
	});
	return result;
};

const iterate = (apiResult) => {
	const { data } = apiResult;
	const { items } = data;

	const result = [];

	items.forEach((element) => {
		result.push({
			repoName: urlTransformer.getRepoName(element.repository_url),
			repoUrl: urlTransformer.toRepoUrl(element.repository_url),
			number: element.number,
			title: element.title,
			searchType: element.searchType,
			isType: element.isType,
			itemUrl: element.html_url,
			status: element.state,
		});
	});
	return result;
};

export const toList = async (from, to) => {
	const items = await list(from, to);
	const result = [];
	items.forEach((element) => {
		result.push(
			mdMaker.lineItem(
				element.repoName,
				element.repoUrl,
				element.number,
				element.title,
				element.isType,
				element.itemUrl,
				element.status
			)
		);
	});
	return result;
};
