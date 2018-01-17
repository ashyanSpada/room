const fs = require('fs');
let readFile = (filePath)=>{
	fs.readFileSync(filePath, (err, data)=>{
		if(err)
			return null;
		return data;
	})
}
module.exports = readFile;