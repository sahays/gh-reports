import * as cliReader from "./utils/cli-reader.js";
import * as metrics from "./metrics/cached-authors-metrics.js";
import * as fsOps from "./utils/fs-operator.js";
import path from "path";

try {
	const from = cliReader.getFromValue();
	const to = cliReader.getToValue();
	const noCache = cliReader.getNoCache();
	const author = cliReader.getAuthorName();
	const fileName = `report-authors-${author}-${from}-to-${to}.md`;
	console.info(`🤓 Writing to ${fileName} ...`);
	const summary = await metrics.toTableSummary(author, from, to, noCache);
	fsOps.moveIfExists(
		fileName,
		path.join("./", ".cache", `.old-${Date.now()}-${fileName}`)
	);
	const lineBreak = "\n\n";
	const data = summary.join(lineBreak);
	fsOps.write(fileName, data, () => {
		console.info("✅ Complete");
	});
} catch (e) {
	console.error("💔 Oh, not good! ", e.message ? e.message : e);
}
