import { Octokit } from "octokit";

const octokit = new Octokit({
	auth: process.env.GH_FG_TOKEN,
	timeZone: "America/Los_Angeles",
});

export const queryIssuesOrPrs = async (queryString) => {
	return await octokit.request("GET /search/issues?q=" + queryString, {
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
};

export const queryRepos = async (queryString) => {
	return await octokit.request("GET /search/repositories?q=" + queryString, {
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
};
