import * as cliReader from "./cli-reader.js";
import * as metrics from "./retros-metrics.js";
import * as fsOps from "./fs-operator.js";

try {
	const from = cliReader.getFromValue();
	const to = cliReader.getToValue();
	const fileName = `retros-${from}-to-${to}.md`;
	console.info(`🤓 Writing to ${fileName} ...`);
	const list = await metrics.toGroupedList(from, to);
	console.log(list.hits);
	console.log(list.inProgress);
	const summary = metrics.toTableSummary();
	const data = `${summary.join("\n\n")}\n\n## Hits:\n\n ${list.hits.join(
		"\n\n"
	)}\n\n## In-Progress:\n\n ${list.inProgress.join("\n\n")}`;
	fsOps.write(fileName, data, () => {
		console.info("✅ Complete");
	});
} catch (e) {
	console.error("💔 Oh, snapped! ", e);
}
