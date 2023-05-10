import * as queries from "../gh-queries.js";
import * as apiCaller from "../utils/api-caller.js";
import * as mdMaker from "../utils/md-maker.js";

const _results = [];

const getData = async (query, searchType, isType) => {
	const data = await apiCaller.queryIssuesOrPrs(query);
	data.query = query;
	data.searchType = searchType;
	data.isType = isType;
	return data;
};

const setResults = async (author, from, to) => {
	const createdPRs = await getData(
		queries.authorCreatedPRs(author, from, to),
		"pulls",
		"pr"
	);
	const reviewedPRs = await getData(
		queries.authorReviewedPRs(author, from, to),
		"pulls",
		"pr"
	);
	const mergedPRs = await getData(
		queries.authorMergedPRs(author, from, to),
		"pulls",
		"pr"
	);

	_results.push(createdPRs);
	_results.push(reviewedPRs);
	_results.push(mergedPRs);
};

export const toTableSummary = async (author, from, to) => {
	const result = [];
	await setResults(author, from, to);
	_results.forEach((element) => {
		const { data, query, searchType } = element;
		const { total_count } = data;
		result.push(
			mdMaker.row(
				total_count,
				query.query,
				`https://github.com/${searchType}`,
				query.label
			)
		);
	});
	return result;
};
