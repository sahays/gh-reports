import * as cliReader from "./utils/cli-reader.js";
import * as metrics from "./metrics/cached-retros-metrics.js";
import * as fsOps from "./utils/fs-operator.js";
import path from "path";

try {
	const from = cliReader.getFromValue();
	const to = cliReader.getToValue();
	const user = cliReader.getUserName();
	const noCache = cliReader.getNoCache();
	const fileName = `report-retros-${from}-to-${to}.md`;
	console.info(`🤓 Writing to ${fileName} ...`);
	const list = await metrics.toGroupedList(from, to, noCache, user);
	const lines = metrics
		.toList(list.hits, "Hits")
		.concat(metrics.toList(list.inProgress, "In progress"));
	const summary = metrics.toTableSummary();
	const lineBreak = "\n\n";
	const data = `${summary.join(lineBreak)}${lineBreak}${lines.join(lineBreak)}`;
	fsOps.moveIfExists(
		fileName,
		path.join("./", ".cache", `.old-${Date.now()}-${fileName}`)
	);
	fsOps.write(fileName, data, () => {
		console.info("✅ Complete");
	});
} catch (e) {
	console.error("💔 Oh, snapped! ", e.message ? e.message : e);
}
