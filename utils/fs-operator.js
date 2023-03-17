import fs from "fs-extra";

export const exists = (fileName) => {
	return fs.existsSync(fileName);
};

export const write = (fileName, data, done) => {
	if (exists(fileName)) {
		fs.rename(fileName, `${Date.now()}-${fileName}`, (err) => {
			if (err) console.error("Failed to rename file", err);
		});
	}

	fs.outputFile(fileName, data, (err) => {
		if (err) console.error("Failed to write", err);
		done();
	});
};

export const readJson = async (fileName) => {
	return await fs.readJSON(fileName);
};

export const writeJson = async (fileName, data) => {
	return await fs.writeJSON(fileName, data);
};
