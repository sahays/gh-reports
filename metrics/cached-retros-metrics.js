import * as metrics from "./retros-metrics.js";
import * as fs from "../utils/fs-operator.js";
import hash from "object-hash";
import path from "path";

export const toGroupedList = async (from, to, noCache, user) => {
	if (noCache) {
		return await metrics.toGroupedList(from, to, user);
	} else {
		const cacheFilename = path.join(
			"./",
			".cache",
			".cache-" + hash(`${from}-${to}`)
		);
		if (fs.exists(cacheFilename)) {
			return await fs.readJson(cacheFilename);
		} else {
			const data = await metrics.toGroupedList(from, to, user);
			await fs.writeJson(cacheFilename, data);
			return data;
		}
	}
};

export const toList = (list, label) => {
	return metrics.toList(list, label);
};

export const toTableSummary = () => {
	return metrics.toTableSummary();
};
