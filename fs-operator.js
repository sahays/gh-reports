import fs from "fs-extra";

export const write = (fileName, data, done) => {
	if (fs.existsSync(fileName)) {
		fs.rename(fileName, `${Date.now()}-${fileName}`, (err) => {
			if (err) console.error("Failed to rename file", err);
		});
	}

	fs.outputFile(fileName, data, (err) => {
		if (err) console.error("Failed to write", err);
		done();
	});
};
