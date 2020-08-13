const puppeteer = require('puppeteer');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.generate = asyncHandler(async (req, res, next) => {
  //wrap inside a try block
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = {
    path: `${process.env.FILE_UPLOAD_PATH}/generated_${Math.round(
      Date.now() / 1000
    )}.pdf`,
    format: 'A4',
    printBackground: true,
  };

  try {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Page Title</title>
          <style>
            html,
            body {
              background-color: white;
            }
            .box {
              width: 80%;
              margin: 0 auto;
              padding: 30px;
              font-size: 15px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: black;
            }
      
            .box table {
              width: 100%;
              text-align: left;
            }
      
            .box table tbody tr td:nth-child(2),
            .box table thead tr th:nth-child(2) {
              text-align: right;
            }
      
            .box table thead.heading tr {
              background-color: #333;
            }
      
            .box table thead tr.content th {
              color: white;
              font-weight: bold;
              padding: 7px 20px 7px 15px;
            }
      
            .box table tbody tr.details td {
              padding-bottom: 10px;
            }
      
            .box table tbody tr.item td {
              padding: 5px 15px;
            }
      
            .box table tbody tr.item.last td {
              border-bottom: 1px solid #cfcfcf;
              padding-bottom: 15px;
            }
      
            .box table tbody tr.item.delivery td {
              border-bottom: 1px solid #cfcfcf;
              padding: 15px;
            }
      
            .box table tbody tr.item.total td {
              padding-top: 15px;
              font-weight: bold;
              font-size: 1.03em;
            }
      
            .box table tbody tr.item.vat td {
              border-bottom: 1px solid #333;
              padding-bottom: 15px;
              padding-top: 0px;
              font-style: italic;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="box">
            <header>
              <img
                src="http://localhost:3000/images/logo.png"
                style="width: 100px; margin-bottom: 5px;"
              />
              <hr />
              <div style="text-align: center; margin: 30px 0;">
                <img
                  src="http://localhost:3000/images/right.png"
                  style="width: 40px;"
                />
                <h3 style="text-align: center; margin-top: 0px; padding-top: 0px;">
                  A Title
                </h3>
              </div>
            </header>
      
            <section
              style="
                border: 1px solid #696969;
                padding: 5px;
                color: #333;
                margin: 0px 15px;
              "
            >
              <p style="margin-top: 0px;">
                Dolor aliquip elit eiusmod duis consequat aute velit eu aliquip enim
                tempor Lorem cillum. Magna consequat incididunt veniam aute mollit eu
                dolor. Culpa incididunt ea non nostrud. Quis deserunt mollit pariatur
                irure qui proident adipisicing ad irure veniam ex. Qui ex voluptate
                officia nisi sunt ullamco aliquip nostrud laborum consectetur magna
                nisi duis irure.
              </p>
              <p style="margin-bottom: 0px;">
                Laboris culpa est consectetur amet occaecat enim aliquip cupidatat
                magna aliqua. Qui excepteur excepteur laboris dolor adipisicing est
                non ea fugiat excepteur aliqua quis. Minim reprehenderit labore ut
                officia incididunt. Sit minim enim nulla irure laborum non qui
                officia. Sit cillum veniam minim exercitation eu nostrud. Eiusmod
                aliquip ad in est eu et qui ea enim adipisicing ex ad ipsum nisi.
              </p>
            </section>
      
            <section style="margin-top: 40px; margin-bottom: 20px;">
              <table cellspacing="0" cellpadding="0">
                <thead class="heading">
                  <tr class="content">
                    <th>
                      Item
                    </th>
                    <th>
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="item">
                    <td>
                      Description item 1
                    </td>
                    <td>
                      $ 375.00
                    </td>
                  </tr>
      
                  <tr class="item last">
                    <td>
                      Description item 2
                    </td>
                    <td>
                      $ 750.00
                    </td>
                  </tr>
      
                  <tr class="item delivery">
                    <td>
                      Delivery
                    </td>
      
                    <td>
                      $ 2.50
                    </td>
                  </tr>
      
                  <tr class="item total">
                    <td>Total</td>
                    <td>$ 1,364.28</td>
                  </tr>
      
                  <tr class="item vat">
                    <td>21 % VAT included of</td>
                    <td>$ 1,127.50</td>
                  </tr>
                </tbody>
              </table>
            </section>
      
            <section>
              <div>
                <strong>Notes</strong><br />
                -
              </div>
              <div style="margin-top: 20px;">
                <ul style="list-style-type: none; margin: 0px; padding: 0px;">
                  <li><span style="font-weight: bold;">Order #1</span></li>
                  <li>
                    <span style="font-weight: bold;">Payment method:</span> mastercard
                  </li>
                </ul>
              </div>
              <div style="margin-top: 20px;">
                <span style="font-weight: bold;">Delivery address</span>
                <ul style="list-style-type: none; margin: 0px; padding: 0px;">
                  <li>Firstname Lastname</li>
                  <li>Street 1</li>
                  <li>Postal City/State</li>
                  <li>Country</li>
                </ul>
              </div>
      
              <div style="margin-top: 20px;">
                <ul style="list-style-type: none; margin: 0px; padding: 0px;">
                  <li>Email: test@somedomain.com</li>
                  <li>Phone: 123456789</li>
                </ul>
              </div>
            </section>
          </div>
        </body>
      </html>
    `);
    await page.pdf(options);
    await browser.close();
    res.status(200).json({ success: true });
  } catch {
    return next(new ErrorResponse(`error generating pdf: ${error}`, 500));
  }
});
