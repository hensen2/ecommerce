const { createTransport } = require("nodemailer");
const { render } = require("@react-email/render");
const React = require("react");
const { google } = require("googleapis");
const config = require("../config/config");
const catchAsync = require("./catchAsync");
const { ConfirmationEmail } = require("../emails/confirmationEmail");

const OAuth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

// Get mail options for email
const getMailOptions = (email, type, emailHtml) => {
  const from = `Beanie Bubble Soap Co. <${config.EMAIL}>`;
  const to = email;
  switch (type) {
    case "orderConfirm":
      return {
        from,
        to,
        subject: "Order Confirmation",
        html: emailHtml,
      };
  }
};

/**
 * @desc    Send an email
 * @param   { String } to - Send to
 * @param   { String } subject - Mail subject
 * @param   { String } text - Mail body
 * @returns { Promise }
 */
const sendEmail = catchAsync(
  async (email, type, orderId, address, items, transaction) => {
    try {
      const accessToken = await OAuth2Client.getAccessToken();

      const transport = createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: config.EMAIL,
          clientId: config.CLIENT_ID,
          clientSecret: config.CLIENT_SECRET,
          refreshToken: config.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const emailHtml = render(
        /*#__PURE__*/ React.createElement(ConfirmationEmail, {
          orderId,
          address,
          items,
          transaction,
        })
      );

      const mailOptions = getMailOptions(email, type, emailHtml);

      await transport.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  }
);

module.exports = {
  sendEmail,
};
