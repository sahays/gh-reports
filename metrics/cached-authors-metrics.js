import * as metrics from "./authors-metrics.js";
import * as fs from "../utils/fs-operator.js";
import hash from "object-hash";
import path from "path";

export const toTableSummary = async (author, from, to, noCache) => {
	if (noCache) {
		return await metrics.toTableSummary(author, from, to);
	} else {
		const cacheFilename = path.join(
			"./",
			".cache",
			".cache-" + hash(`${author}-${from}-${to}`)
		);
		if (fs.exists(cacheFilename)) {
			return await fs.readJson(cacheFilename);
		} else {
			const data = await metrics.toTableSummary(author, from, to);
			await fs.writeJson(cacheFilename, data);
			return data;
		}
	}
};
