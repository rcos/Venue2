if (process.env.NODE_ENV === "production") {
  const fs = require("fs");
  fs.writeFile(process.env.GCS_KEY_FILE, process.env.GCS_CRED, err => {});
}
