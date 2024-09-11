const {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} = require("@react-email/components");
const React = require("react");
const ConfirmationEmail = ({ orderId, address, items, transaction }) =>
  /*#__PURE__*/ React.createElement(
    Html,
    null,
    /*#__PURE__*/ React.createElement(Head, null),
    /*#__PURE__*/ React.createElement(
      Preview,
      null,
      `Thank you for shopping with Beanie Bubble!`
    ),
    /*#__PURE__*/ React.createElement(
      Body,
      {
        style: main,
      },
      /*#__PURE__*/ React.createElement(
        Container,
        {
          style: container,
        },
        /*#__PURE__*/ React.createElement(Hr, {
          style: global.hr,
        }),
        /*#__PURE__*/ React.createElement(
          Section,
          {
            style: message,
          },
          /*#__PURE__*/ React.createElement(Img, {
            src: `https://res.cloudinary.com/dxiv191qr/image/upload/v1698346602/bb-logo_beqvm3.png`,
            width: "100",
            height: "100",
            alt: "Beanie Bubble",
            style: {
              margin: "auto",
            },
          }),
          /*#__PURE__*/ React.createElement(
            Heading,
            {
              style: global.heading,
            },
            "Order Confirmation"
          ),
          /*#__PURE__*/ React.createElement(
            Text,
            {
              style: {
                ...global.text,
                marginTop: 24,
              },
            },
            "We\xB4ve received your order and will contact you as soon as your package is shipped. You can find your purchase information below."
          )
        ),
        /*#__PURE__*/ React.createElement(Hr, {
          style: global.hr,
        }),
        /*#__PURE__*/ React.createElement(
          Section,
          {
            style: {
              ...global.defaultPadding,
              backgroundColor: "#F7F7F7",
            },
          },
          /*#__PURE__*/ React.createElement(
            Text,
            {
              style: adressTitle,
            },
            "Shipping to: ",
            `${address.firstName} ${address.lastName}`
          ),
          /*#__PURE__*/ React.createElement(
            Text,
            {
              style: {
                ...global.text,
                fontSize: 14,
              },
            },
            `${address.addressLine1}${
              address.addressLine2 ? " " + address.addressLine2 : ""
            }, ${address.cityLocality}, ${address.stateProvince} ${
              address.postalCode
            }`
          )
        ),
        /*#__PURE__*/ React.createElement(Hr, {
          style: global.hr,
        }),
        /*#__PURE__*/ React.createElement(
          Section,
          {
            style: {
              ...paddingX,
              paddingTop: "40px",
              paddingBottom: "40px",
            },
          },
          items?.map((item) =>
            /*#__PURE__*/ React.createElement(
              Row,
              {
                key: item.name,
              },
              /*#__PURE__*/ React.createElement(
                Column,
                null,
                /*#__PURE__*/ React.createElement(Img, {
                  src: item.product.mainImage,
                  alt: item.product.name,
                  style: {
                    float: "left",
                  },
                  width: "150px",
                })
              ),
              /*#__PURE__*/ React.createElement(
                Column,
                {
                  style: {
                    verticalAlign: "middle",
                    paddingLeft: "12px",
                  },
                },
                /*#__PURE__*/ React.createElement(
                  Text,
                  {
                    style: {
                      ...paragraph,
                      fontWeight: "500",
                    },
                  },
                  item.product.name
                ),
                /*#__PURE__*/ React.createElement(
                  Text,
                  {
                    style: global.text,
                  },
                  `Qty: ${item.totalProductQuantity}`
                ),
                /*#__PURE__*/ React.createElement(
                  Text,
                  {
                    style: global.text,
                  },
                  `$${item.totalProductPrice.toFixed(2)}`
                )
              )
            )
          ),
          /*#__PURE__*/ React.createElement(Hr, {
            style: global.hr,
          }),
          /*#__PURE__*/ React.createElement(
            Row,
            {
              style: {
                marginTop: "20px",
              },
            },
            /*#__PURE__*/ React.createElement(
              Column,
              {
                align: "left",
                width: "33%",
              },
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: global.paragraphWithBold,
                },
                "Shipping"
              ),
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: global.paragraphWithBold,
                },
                "Taxes"
              ),
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: global.paragraphWithBold,
                },
                "Total"
              )
            ),
            /*#__PURE__*/ React.createElement(
              Column,
              {
                align: "right",
                width: "33%",
              },
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: track.number,
                },
                `$${transaction.shippingPrice.toFixed(2)}`
              ),
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: track.number,
                },
                `$${transaction.taxPrice.toFixed(2)}`
              ),
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: track.number,
                },
                `$${transaction.totalPrice.toFixed(2)}`
              )
            )
          )
        ),
        /*#__PURE__*/ React.createElement(Hr, {
          style: global.hr,
        }),
        /*#__PURE__*/ React.createElement(
          Section,
          {
            style: {
              ...global.defaultPadding,
              backgroundColor: "#F7F7F7",
            },
          },
          /*#__PURE__*/ React.createElement(
            Row,
            null,
            /*#__PURE__*/ React.createElement(
              Column,
              {
                align: "left",
              },
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: global.paragraphWithBold,
                },
                "Order Number"
              ),
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: track.number,
                },
                orderId
              )
            ),
            /*#__PURE__*/ React.createElement(
              Column,
              {
                align: "right",
              },
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: global.paragraphWithBold,
                },
                "Order Date"
              ),
              /*#__PURE__*/ React.createElement(
                Text,
                {
                  style: track.number,
                },
                transaction.paidOn.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              )
            )
          )
        ),
        /*#__PURE__*/ React.createElement(Hr, {
          style: global.hr,
        }),
        /*#__PURE__*/ React.createElement(
          Section,
          {
            style: paddingY,
          },
          /*#__PURE__*/ React.createElement(
            Text,
            {
              style: global.heading,
            },
            "BeanieBubbleSoap.com"
          )
        ),
        /*#__PURE__*/ React.createElement(Hr, {
          style: {
            ...global.hr,
            marginTop: "12px",
          },
        }),
        /*#__PURE__*/ React.createElement(
          Section,
          {
            style: paddingY,
          },
          /*#__PURE__*/ React.createElement(
            Text,
            {
              style: {
                ...footer.text,
                ...paddingX,
                paddingBottom: 30,
              },
            },
            "Please contact us on our website if you have any questions. (If you reply to this email, we won't be able to see it.)"
          ),
          /*#__PURE__*/ React.createElement(
            Text,
            {
              style: footer.text,
            },
            "\xA9 2023 Beanie Bubble Soap Co. All Rights Reserved."
          )
        )
      )
    )
  );
const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};
const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};
const paragraph = {
  margin: "0",
  lineHeight: "2",
};
const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: {
    ...paragraph,
    fontWeight: "bold",
  },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  },
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  },
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
  margin: "10px auto",
  width: "600px",
  border: "1px solid #E5E5E5",
};
const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "0 0 0 0",
    fontWeight: 500,
    lineHeight: "2",
    color: "#6F6F6F",
  },
};
const message = {
  padding: "40px 74px",
  textAlign: "center",
};
const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};
const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  },
};
module.exports = {
  ConfirmationEmail,
};
