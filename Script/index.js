const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = require('./data.json');

const templatePath = path.join(__dirname, '../OBF_Staff_Signatures/OBF_Signature_drafts 02.html');
const outputDir = path.join(__dirname, '../Output');

fs.mkdirSync(outputDir, { recursive: true });

data.forEach((entry) => {
    ejs.renderFile(templatePath, entry, (err, html) => {
        if (err) {
            console.error('Error rendering template:', err);
            return;
        }
        fs.writeFile(path.join(outputDir, `${entry.name.replace(/\s/g, '_')}_OBF_Signature.html`), html, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log(`Email signature for ${entry.name} has been generated successfully.`);
            }
        });
    });
});

