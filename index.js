import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
  .prompt([
    {
      message: "Enter the URL to generate its QR Code: ",
      name: "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;

    // Save in multiple formats
    const formats = ['png', 'svg', 'eps', 'pdf'];

    formats.forEach((format) => {
      const qrCode = qr.image(url, { type: format });
      qrCode.pipe(fs.createWriteStream(`qr_code.${format}`));
    });

    // Save the URL in a text file
    fs.writeFile('url.txt', url, (err) => {
      if (err) throw err;
      console.log("QR Code saved in PNG, SVG, EPS, and PDF formats.");
      console.log("URL saved to url.txt");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in this environment.");
    } else {
      console.log("Something went wrong:", error);
    }
  });
