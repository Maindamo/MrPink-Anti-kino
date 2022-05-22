const Stage = require("telegraf/stage");

const changeUSDTWallet = require("./scenes/changeUSDTWallet");
const complaint = require("./scenes/complaint");
const whatsappLink = require("./scenes/whatsappLink");
const createMentorAnket = require("./scenes/createMentorAnket");
const changeMentor = require("./scenes/changeMentor");

const adminSendMail = require("./scenes/admin/sendMail");
const adminEditValue = require("./scenes/admin/editValue");
const adminEditUserPercent = require("./scenes/admin/editUserPercent");
const adminAddProfit = require("./scenes/admin/addProfit");
const adminAddWriter = require("./scenes/admin/addWriter");
const adminAddBin = require("./scenes/admin/addBin");
const adminServiceEditDomain = require("./scenes/admin/serviceEditDomain");
const adminAnswerComplaint = require("./scenes/admin/answerComplaint");

const editPrice = require("./scenes/ads/editPrice");
const sendRequest = require("./scenes/sendRequest");
const sendSms = require("./scenes/sendSms");
const sendEmail = require("./scenes/sendEmail");

const supportSendMessage = require("./scenes/supportSendMessage");

const addsupptemp = require("./scenes/createSuppTemp");

const create_link = require("./scenes/createLink/index");

const stage = new Stage([
  changeUSDTWallet,
  complaint,
  whatsappLink,
  createMentorAnket,
  changeMentor,

  create_link,

  sendRequest,
  sendSms,
  sendEmail,
  editPrice,
  supportSendMessage,

  adminSendMail,
  adminEditValue,
  adminEditUserPercent,
  adminAddProfit,
  adminAddWriter,
  adminAddBin,
  adminServiceEditDomain,
  adminAnswerComplaint,

  addsupptemp,
]);

stage.action("cancel", async (ctx) => {
  await ctx.replyOrEdit("♻️ <b>Отменено!</b>", { parse_mode: "HTML" });
  await ctx.scene.leave();
});

module.exports = stage;
