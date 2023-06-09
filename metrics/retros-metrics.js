import * as urlTransformer from "../utils/url-transformer.js";
import * as queries from "../gh-queries.js";
import * as apiCaller from "../utils/api-caller.js";
import * as mdMaker from "../utils/md-maker.js";
import { groupBy, sortBy, uniq } from "underscore";

const _results = [];

const getData = async (query, searchType, isType) => {
	const data = await apiCaller.queryIssuesOrPrs(query.query);
	data.query = query.query;
	data.queryLabel = query.label;
	data.searchType = searchType;
	data.isType = isType;
	return data;
};

const setResults = async (from, to, user) => {
	const openedIssues = await getData(
		queries.openedIssues(from, to, user),
		"issues",
		"issue"
	);
	const closedIssues = await getData(
		queries.closedIssues(from, to, user),
		"issues",
		"issue"
	);
	const openedPRs = await getData(
		queries.openedPRs(from, to, user),
		"pulls",
		"pr"
	);
	const mergedPRs = await getData(
		queries.mergedPRs(from, to, user),
		"pulls",
		"pr"
	);
	const closedPRs = await getData(
		queries.closedPRs(from, to, user),
		"pulls",
		"pr"
	);

	_results.push(openedIssues);
	_results.push(closedIssues);
	_results.push(openedPRs);
	_results.push(mergedPRs);
	_results.push(closedPRs);
};

const toFlattenedArray = async (from, to, user) => {
	const items = [];

	await setResults(from, to, user);

	_results.forEach((element) => {
		items.push(toDisplayArray(element));
	});

	const flatItems = items.flat();

	let sortedItems = sortBy(flatItems, (f) => {
		return f.number;
	});

	let uniqItems = uniq(sortedItems, (s) => {
		return s.number;
	});

	console.log(
		`duplicates removed: ${
			sortedItems.length - uniqItems.length
		} unique items: ${uniqItems.length}`
	);

	return uniqItems;
};

const toDisplayArray = (apiResult) => {
	const { data, isType } = apiResult;
	const { items } = data;

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

export const toList = (list, h1) => {
	const lines = [];
	lines.push(mdMaker.h1(h1));
	Object.keys(list).forEach((k) => {
		lines.push(mdMaker.h2(k));
		list[k].forEach((element) => {
			let status = "";
			if (element.isPr && element.isClosed) status = "merged";
			lines.push(
				mdMaker.lineItem(
					element.number,
					element.title,
					element.isType,
					element.itemUrl,
					element.isPr ? status : element.status
				)
			);
		});
	});
	return lines;
};

// useful states if issues: open, closed
// useful states if PRs: open, merged
export const toGroupedList = async (from, to, user) => {
	const items = await toFlattenedArray(from, to, user);
	// const hits = [];
	// const inProgress = [];

	const itemsByStatus = groupBy(items, (el) => {
		// return el.status
		if (el.isPr && el.isMerged) return "hits";
		if (el.isOpen) return "progress";
		if (el.isClosed) return "hits";
	});

	const hitsByRepo = groupBy(itemsByStatus["hits"], (el) => {
		return el.repoName;
	});

	const inProgressByRepo = groupBy(itemsByStatus["progress"], (el) => {
		return el.repoName;
	});

	return {
		hits: hitsByRepo,
		inProgress: inProgressByRepo,
	};
};

export const toTableSummary = () => {
	const result = [];
	_results.forEach((element) => {
		const { data, query, searchType, queryLabel } = element;
		const { total_count } = data;
		result.push(
			mdMaker.row(
				total_count,
				query,
				`https://github.com/${searchType}`,
				queryLabel
			)
		);
	});
	return result;
};
