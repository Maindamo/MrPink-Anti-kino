const { Markup } = require("telegraf");
const { User } = require("../database");

module.exports = async (ctx) => {
  try {
    let referralsCount = await User.count({
      where: {
        referral: ctx.from.id,
      },
    });
    if (!referralsCount) {
      referralsCount = 0;
    }
    
    return ctx
      .replyOrEdit(`📊 <b>Реферальная программа</b>

<i>Ты будешь получать 1% с каждого профита, который заведёт пользователь, перешедший по твоей ссылке (пользователь должен быть уже принят в нашу команду)</i>

🧲 <b>Количество рефералов:</b> ${referralsCount}
🔗 <b>Ваша реферальная ссылка:</b> https://t.me/${process.env.BOT_LOGIN}?start=${ctx.from.id}`, {
        parse_mode: "HTML",
      })
  } catch (err) {
    console.log(err)
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
};
