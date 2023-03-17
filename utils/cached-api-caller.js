import * as api from "./api-caller.js";
import * as fs from "./fs-operator.js";
import hash from "object-hash";
import path from "path";

export const queryIssuesOrPrs = async (queryString, noCache = false) => {
	if (noCache) {
		return await api.queryIssuesOrPrs(queryString);
	} else {
		const cacheFilename = path.join("./", "_cache", hash(queryString));
		if (fs.exists(cacheFilename)) {
			return await fs.readJson(cacheFilename);
		} else {
			const data = await api.queryIssuesOrPrs(queryString);
			await fs.writeJson(cacheFilename, data);
			return data;
		}
	}
};

export const queryRepos = async (queryString, noCache = false) => {
	return await api.queryRepos(queryString);
};
