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

const setResults = async (from, to) => {
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

const toFlattenedArray = async (from, to) => {
	const items = [];

	await setResults(from, to);

	_results.forEach((element) => {
		items.push(toDisplayArray(element));
	});

	return items.flat();
};

const toDisplayArray = (apiResult) => {
	const { data, isType } = apiResult;
	const { items } = data;

	console.log(isType);

	const result = [];

	items.forEach((element) => {
		result.push({
			repoName: urlTransformer.getRepoName(element.repository_url),
			repoUrl: urlTransformer.toRepoUrl(element.repository_url),
			number: element.number,
			title: element.title,
			searchType: element.searchType,
			isType: isType,
			itemUrl: element.html_url,
			status: element.state,
			mergedAt: isType == "pr" ? element.pull_request.merged_at : null,
			isOpen: element.state == "open",
			isClosed: element.state == "closed",
			isMerged: element.pull_request
				? element.pull_request.merged_at
					? true
					: false
				: null,
			isPr: isType == "pr",
		});
	});
	return result;
};

export const toList = async (from, to) => {
	const items = await toFlattenedArray(from, to);
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

export const toGroupedList = async (from, to) => {
	const items = await toFlattenedArray(from, to);
	const hits = [];
	const inProgress = [];
	// useful states if issues: open, closed
	// useful states if PRs: open, merged
	items.forEach((element) => {
		const lineItem = mdMaker.lineItem(
			element.repoName,
			element.repoUrl,
			element.number,
			element.title,
			element.isType,
			element.itemUrl,
			element.status
		);
		if (element.isOpen) {
			inProgress.push(lineItem);
		}
		if (element.isPr && element.isMerged) {
			hits.push(
				mdMaker.lineItem(
					element.repoName,
					element.repoUrl,
					element.number,
					element.title,
					element.isType,
					element.itemUrl,
					"merged"
				)
			);
		} else if (element.status.isClosed) {
			hits.push(lineItem);
		}
	});

	return {
		hits: hits,
		inProgress: inProgress,
	};
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
