import fs from "file-system";

export const write = (fileName, data, done) => {
	if (fs.fs.existsSync(fileName)) {
		fs.fs.rename(fileName, `${Date.now()}-${fileName}`, (err) => {
			if (err) console.error("Failed to rename file", err);
		});
	}

	fs.writeFile(fileName, data, (err) => {
		if (err) console.error("Failed to write", err);
		done();
	});
};
