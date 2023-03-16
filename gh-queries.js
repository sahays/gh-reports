export const openedIssues = (from, to) => {
	return encodeURIComponent(
		`is:issue is:public created:${from}..${to} user:partiql`
	);
};

export const closedIssues = (from, to) => {
	return encodeURIComponent(
		`is:issue is:public closed:${from}..${to} user:partiql`
	);
};

export const openedPRs = (from, to) => {
	return encodeURIComponent(
		`is:pull-request is:public created:${from}..${to} user:partiql`
	);
};

export const mergedPRs = (from, to) => {
	return encodeURIComponent(
		`is:pull-request is:public merged:${from}..${to} user:partiql`
	);
};

export const closedPRs = (from, to) => {
	return encodeURIComponent(
		`is:pull-request is:public closed:${from}..${to} -merged:${from}..${to} user:partiql`
	);
};

export const reviewedPRs = (author, from, to) => {
	return encodeURIComponent(
		`is:pull-request reviewed-by:${author} -author:${author} created:${from}..${to}`
	);
};
