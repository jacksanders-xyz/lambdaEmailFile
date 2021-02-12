exports.handler = async (event, context) => {
  let statusCode = "200";
    
  if (event.httpMethod === "POST"){
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SECRET_KEY)

    const { email, message } = JSON.parse(event.body)

    try {
      await sgMail.send({
        to: "jack.sanders.xyz@gmail.com",
        from: "jack.sanders.xyz@gmail.com",
        reply_to: email,
        subject: "Inbound message from jacksanders.xyz",
        text: message,
      })
    } catch (err) {
      statusCode = "500";
    }
  }

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "https://jacksanders.xyz",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
  };
};
