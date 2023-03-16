/**
 * queries
 * repos: is%3Apublic+sort%3Aupdated-desc+type%3Arepository+org%3Apartiql&type=Repositories
 * opened issues: is:issue is:public created:2023-02-27..2023-03-10 user:partiql
 * closed issues: is:issue is:public closed:2023-02-27..2023-03-10 user:partiql
 * opened prs: is:pr is:public created:2023-02-27..2023-03-10 user:partiql
 * merged prs: is:pr is:public merged:2023-02-27..2023-03-10 user:partiql
 * closed prs: is:pr is:public closed:2023-02-27..2023-03-10 -merged:2023-02-27..2023-03-10 user:partiql
 * authored prs: is:pr author:jpschorr created:2022-10-01..2022-12-31
 * reviewed prs: is:pr reviewed-by:jpschorr -author:jpschorr created:2022-10-01..2022-12-31
 *
 */

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
