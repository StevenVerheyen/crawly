const puppeteer = require('puppeteer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { isUrl, isValidDevice } = require('../utils/validators');

exports.crawl = asyncHandler(async (req, res, next) => {
  const { name, website, format, width, height, landscape, device } = req.body;

  if (!name || name.length === 0) {
    return next(new ErrorResponse('no filename provided', 500));
  }
  if (!website || website.length === 0 || isUrl(website) === false) {
    return next(new ErrorResponse(`invalid url: ${website}`, 500));
  }

  const fileName = `${Math.round(Date.now() / 1000)}_${name}.pdf`;
  const path = `${process.env.FILE_UPLOAD_PATH}/${fileName}`;
  const isMobile = isValidDevice(device);
  const options = {
    path,
    printBackground: true,
    landscape,
    mobile: isMobile,
  };

  // do not set format and sizes if we are going to emulate a device
  if (!isMobile) {
    // `format` -> `width` and `height` are ignored
    // No `width` or `height` -> Format is used. If no format, A2 is used.
    if (format && format.length > 0) {
      options.format = format;
    } else if (!width || !height) {
      // in this case we know that format is not provided
      options.format = 'A2'; // closest to 1080p
    } else {
      options.width = width;
      options.height = height;
    }
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    if (isMobile) {
      await page.emulate(puppeteer.devices[device]);
    }
    await page.goto(website, { waitUntil: 'networkidle2' });
    await page.pdf(options);
    await browser.close();
    await res.status(200).json({
      success: true,
      fileName,
    });
  } catch (error) {
    browser.close();
    return next(new ErrorResponse(`error generating pdf: ${error}`, 500));
  }
});

exports.downloadPdf = asyncHandler(async (req, res, next) => {
  const fileName = req.params.fileName;
  try {
    const file = `./public/pdfs/${fileName}`;
    res.download(file);
  } catch (error) {
    return next(new ErrorResponse(`error downloading pdf: ${error}`, 500));
  }
});
