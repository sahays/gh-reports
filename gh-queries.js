export const openedIssues = (from, to, user) => {
	return encodeURIComponent(
		`is:issue is:public created:${from}..${to} user:${user}`
	);
};

export const closedIssues = (from, to, user) => {
	return encodeURIComponent(
		`is:issue is:public closed:${from}..${to} user:${user}`
	);
};

export const openedPRs = (from, to, user) => {
	return encodeURIComponent(
		`is:pull-request is:public created:${from}..${to} user:${user}`
	);
};

export const mergedPRs = (from, to, user) => {
	return encodeURIComponent(
		`is:pull-request is:public merged:${from}..${to} user:${user}`
	);
};

export const closedPRs = (from, to, user) => {
	return encodeURIComponent(
		`is:pull-request is:public closed:${from}..${to} -merged:${from}..${to} user:${user}`
	);
};

export const authorReviewedPRs = (author, from, to) => {
	return encodeURIComponent(
		`is:pull-request reviewed-by:${author} -author:${author} created:${from}..${to}`
	);
};

export const authorCreatedPRs = (author, from, to) => {
	return encodeURIComponent(
		`is:pull-request author:${author} created:${from}..${to} `
	);
};
