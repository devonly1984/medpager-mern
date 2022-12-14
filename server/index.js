const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = proces.env.TWILIO_MESSAGING_SERVICESID;
const twilioClient = require("twilio")(accountSid, authToken);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("I work");
});
app.post("/", (req, res) => {
  const { message, user: sender, type, members } = req.body;
  if (type === "message.new") {
    members
      .filter((member) => member.user.id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          twilioClient.messages
            .create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: MGb32dbfc69696710f3d2c142ad43c3877,
              to: user.phoneNumber,
            })
            .then(() => console.log("Message sent"))
            .catch((error) => console.log(error));
        }
      });
    return res.status(200).send("Message sent!");
  }
  return res.send(200).send("Not a new message request");
});
app.use("/auth", authRoutes);
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
