import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const htmlContent = `
<tbody>

    <tr>

        <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px"
            valign="top">

            <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important"
                width="100%">

                <tbody>

                    <tr>

                        <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top"
                            valign="top">

                            <h2 style="margin: 0px 0px 30px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: rgb(41, 70, 97) !important; --darkreader-inline-color:#b5d1e7;"
                                data-darkreader-inline-color="">You're on your way!<br>

                                Let's confirm your email address.</h2>



                            <p style="margin: 0px 0px 30px; color: rgb(41, 70, 97); font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; --darkreader-inline-color:#b5d1e7;"
                                data-darkreader-inline-color="">By clicking on the following link, you are confirming
                                your email address.</p>

                        </td>

                    </tr>

                    <tr>

                        <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top"
                            valign="top">

                            <table cellpadding="0" cellspacing="0"
                                style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important"
                                width="100%">

                                <tbody>

                                    <tr>

                                        <td align="center"
                                            style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px"
                                            valign="top">

                                            <table cellpadding="0" cellspacing="0"
                                                style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important">

                                                <tbody>

                                                    <tr>

                                                        <td align="center" bgcolor="#348eda"
                                                            style="box-sizing: border-box; padding: 0px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Helvetica, Arial, sans-serif; font-size: 16px; vertical-align: top; background-color: rgb(52, 142, 218); border-radius: 2px; text-align: center; --darkreader-inline-bgcolor:#1c6099;"
                                                            valign="top" data-darkreader-inline-bgcolor=""><a
                                                                href="href_link"
                                                                style="box-sizing: border-box; font-weight: 400; text-decoration: none; display: inline-block; margin: 0px; color: rgb(255, 255, 255); background-color: rgb(52, 142, 218); border: 1px solid rgb(52, 142, 218); border-radius: 2px; font-size: 14px; padding: 12px 45px; --darkreader-inline-color:#ffffff; --darkreader-inline-bgcolor:#1c6099; --darkreader-inline-border-top:#1e67a5; --darkreader-inline-border-right:#1e67a5; --darkreader-inline-border-bottom:#1e67a5; --darkreader-inline-border-left:#1e67a5;"
                                                                target="_blank"
                                                                data-saferedirecturl="href_link"
                                                                data-darkreader-inline-color=""
                                                                data-darkreader-inline-bgcolor=""
                                                                data-darkreader-inline-border-top=""
                                                                data-darkreader-inline-border-right=""
                                                                data-darkreader-inline-border-bottom=""
                                                                data-darkreader-inline-border-left="">Confirm Email
                                                                Address</a></td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </td>

                    </tr>

                </tbody>

            </table>

        </td>

    </tr>

</tbody>
`;

sgMail.setApiKey(process.env.TWILIO_API_KEY);
const msg = {
  to: process.env.TEST_EMAIL,
  from: process.env.ADMIN_EMAIL,
  subject: 'Testing HTML content',
  html: htmlContent,
};
sgMail.send(msg);
