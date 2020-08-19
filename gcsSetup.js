if(process.env.NODE_ENV === 'production') {
	const fs = require('fs');
	fs.writeFile(process.env.GCP_KEY_FILE, process.env.GCP_CRED, (err) => {});
}