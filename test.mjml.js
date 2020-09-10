require("dotenv").config();
// const mjml2html = require("mjml");

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mail = require("./app/config/utils/mail");

mail.send("welceme", {}, { to: "ac524.brown@gmail.com", subject: "Test" });

// const fs = require("fs");
// const util = require("util");
// const path = require("path");

// const readFileAsync = util.promisify( fs.readFile );

// const test = async () => {

//     console.log( await readFileAsync("app/config/utils/views/email/welcome.mjml", "utf8") );

// }

// test();

// const html = mjml2html(`<mjml>
//             <mj-body>
          
//               <!-- Company Header -->
//               <mj-section background-color="#f0f0f0">
//                   <mj-column>
//                       <mj-text font-size="20px" color="#626262">
//                           Welcome to Classroom!
//                       </mj-text>
//                   </mj-column>
//               </mj-section>
          
//             </mj-body>
//           </mjml>`);

// console.log(html);