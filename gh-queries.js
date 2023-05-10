export const openedIssues = (from, to, user) => {
	return {
		label: "Opened Issues",
		query: encodeURIComponent(
			`type:issue is:public created:${from}..${to} user:${user}`
		),
	};
};

export const closedIssues = (from, to, user) => {
	return {
		label: "Closed Issues",
		query: encodeURIComponent(
			`type:issue is:public closed:${from}..${to} user:${user}`
		),
	};
};

export const openedPRs = (from, to, user) => {
	return {
		label: "Opened PRs",
		query: encodeURIComponent(
			`type:pr is:public created:${from}..${to} user:${user}`
		),
	};
};

export const mergedPRs = (from, to, user) => {
	return {
		label: "Merged PRs",
		query: encodeURIComponent(
			`type:pr is:public merged:${from}..${to} user:${user}`
		),
	};
};

export const closedPRs = (from, to, user) => {
	return {
		label: "Closed PRs",
		query: encodeURIComponent(
			`type:pr is:public closed:${from}..${to} -merged:${from}..${to} user:${user}`
		),
	};
};

export const authorReviewedPRs = (author, from, to) => {
	return {
		label: `${author} reviewed PRs`,
		query: encodeURIComponent(
			`is:pr reviewed-by:${author} -author:${author} created:${from}..${to}`
		),
	};
};

export const authorCreatedPRs = (author, from, to) => {
	return {
		label: `${author} created PRs`,
		query: encodeURIComponent(`is:pr author:${author} created:${from}..${to} `),
	};
};

export const authorMergedPRs = (author, from, to) => {
	return {
		label: `${author} merged PRs`,
		query: encodeURIComponent(`is:pr author:${author} merged:${from}..${to} `),
	};
};
