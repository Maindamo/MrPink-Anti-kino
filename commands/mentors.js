const { Markup } = require("telegraf");
const locale = require("../locale");

module.exports = async (ctx) => {
  return ctx
    .replyOrEdit(
      `🧑🏻‍🎓 Система НАСТАВНИКОВ поможет зарабатывать тебе твой первый кэш!
💡 Совсем новенький и чувствуешь себя неуверенно в этой сфере? 
💡 Наставники научат тебя уникальным фишкам, грамотному общению с мамонтами и расскажут все нюансы нашей работы!
💡 Если ты считаешь, что можешь обучать скаму других людей, то у тебя есть возможность подать заявку на роль наставника! 
💡 С каждого профита наставник будет получать 5%.`,
      {
        reply_markup: Markup.inlineKeyboard([
          [Markup.callbackButton(locale.mentors.mentors_list, "mentors_list")],
          [Markup.callbackButton(locale.mentors.change_mentor, "change_mentor")],
          [
            ...(ctx.state.user.status === 1 // 3 --------------------------------
              ? [Markup.callbackButton(locale.mentors.my_anket, `my_mentor_anket`)]
              : []),
          ],
        ]),
        parse_mode: "HTML",
      }
    )
    .catch((err) => ctx.reply("❌ Ошибка"));
};
