import * as cliReader from "./cli-reader.js";
import * as metrics from "./retros-metrics.js";
import * as fsOps from "./fs-operator.js";

try {
	const from = cliReader.getFromValue();
	const to = cliReader.getToValue();
	const fileName = `retros-${from}-to-${to}.md`;
	console.info(`🤓 Writing to ${fileName} ...`);
	const list = await metrics.toGroupedList(from, to);
	const lines = metrics
		.toList(list.hits, "Hits")
		.concat(metrics.toList(list.inProgress, "In progress"));
	const summary = metrics.toTableSummary();
	const lineBreak = "\n\n";
	const data = `${summary.join(lineBreak)}${lineBreak}${lines.join(lineBreak)}`;
	fsOps.write(fileName, data, () => {
		console.info("✅ Complete");
	});
} catch (e) {
	console.error("💔 Oh, snapped! ", e);
}
