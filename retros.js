import * as cliReader from "./cli-reader.js";
import * as metrics from "./retros-metrics.js";
import * as fsOps from "./fs-ops.js";

const from = cliReader.getFromValue();
const to = cliReader.getToValue();
const fileName = `retros-${from}-to-${to}.md`;

console.log(`writing to ${fileName} ...`);

const data = await metrics.toArray(from, to);

fsOps.write(fileName, data.join("\n\n"), () => {
	console.log("complete \u2713");
});
