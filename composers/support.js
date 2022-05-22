const { Composer, Markup } = require("telegraf");
const { Country, SupportTemplate, SupportChat } = require("../database");
const chunk = require("chunk");

const support = new Composer();

support.action("support_inst", (ctx) => {
  ctx.replyOrEdit(
    `🚀 Система Технической поддежки поможет зарабатывать тебе твой первый кэш!
🧨 Совсем новенький и чувствуешь себя неуверенно в этой сфере ?  Просто заведи человека на ссылку-а мы сделаем всё за тебя`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("📖 Шаблоны", "support_temp")],
      ]),
    }
  );
});

support.action("support_temp", (ctx) => {
  ctx.replyOrEdit(`🚀 Здесь вы можете удалять/добавлять новые шаблоны для ТЕХПОДДЕРЖКИ`, {
    reply_markup: Markup.inlineKeyboard([
      [Markup.callbackButton("📖 Шаблоны", "support_temp_list"), Markup.callbackButton("📖 Добавить Шаблон", "support_add_temp")],
    ]),
  });
});

support.action("support_add_temp", async (ctx) => {
  const countries = await Country.findAll({
    order: [["id", "asc"]],
    where: {
      status: 1,
    },
  });
  ctx.replyOrEdit(`🔧 Выберите страну`, {
    reply_markup: Markup.inlineKeyboard([
      ...chunk(countries.map((v) => Markup.callbackButton(v.title, `add_temp_supp_${v.id}`))),
    ]),
  });
});

support.action("support_temp_list", async (ctx) => {
  const countries = await Country.findAll({
    order: [["id", "asc"]],
    where: {
      status: 1,
    },
  });
  ctx.replyOrEdit(`🔧 Выберите страну`, {
    reply_markup: Markup.inlineKeyboard([
      ...chunk(countries.map((v) => Markup.callbackButton(v.title, `get_temp_supp_${v.id}`))),
    ]),
  });
});

support.action(/add_temp_supp_([a-z]{2,3})/, async (ctx) => {
  ctx.scene.enter("add_temp_supp", {
    countryCode: ctx.match[1],
  });
});

support.action(/get_temp_supp_([a-z]{2,3})/, async (ctx) => {
  const template = await SupportTemplate.findAll({
    order: [["id", "asc"]],
    where: {
      status: 1,
      userID: ctx.from.id,
      countryCode: ctx.match[1],
    },
  });
  if (template.length > 0) {
    template.forEach((temp) => {
      ctx.replyWithHTML(`🔰 <b>Название:</b> ${temp.title}\n📋 <b>Текст:</b> <code>${temp.message}</code>`, {
        reply_markup: Markup.inlineKeyboard([Markup.callbackButton("Удалить", "delete_supp_temp_" + temp.id)]),
      });
    });
  } else {
    ctx.replyOrEdit("❌ <b>Ошибка, у вас нет шаблона</b>", {
      reply_markup: Markup.inlineKeyboard([Markup.callbackButton("Назад", "support_temp")]),
      parse_mode: "HTML",
    });
  }
});

support.action(/delete_supp_temp_([0-9]+)/, async (ctx) => {
  try {
    const template = await SupportTemplate.findOne({
      where: {
        id: ctx.match[1],
        userId: ctx.from.id,
      },
    });
    await template.update({
      status: 0,
    });
    ctx.replyOrEdit("❌ <b>Шаблон успешно удален</b>", {
      reply_markup: Markup.inlineKeyboard([Markup.callbackButton("Назад", "support_temp")]),
      parse_mode: "HTML",
    });
  } catch (err) {}
});

support.action(/^get_all_temp_country:([a-z]+)_sup:([0-9]+)$/, async (ctx) => {
  try {
    var button = [[Markup.callbackButton("✍️ Отправить сообщение в ТП", `support_${ctx.match[2]}_send_message`)]];
    const template = await SupportTemplate.findAll({
      order: [["id", "asc"]],
      where: {
        status: 1,
        userID: ctx.from.id,
        countryCode: ctx.match[1],
      },
    });
    if (template.length > 0) {
      template.forEach((temp) => {
        button.push([Markup.callbackButton(temp.title, `send_message_temp_${temp.id}_sup_${ctx.match[2]}`)]);
      });
      ctx.editMessageReplyMarkup(Markup.inlineKeyboard(button));
    } else {
      ctx.replyWithHTML(`❌ <b>Ошибка, у вас нет шаблона</b>`);
    }
  } catch (e) {
    ctx.replyWithHTML(`❌ <b>Ошибка</b>`);
  }
});

support.action(/^send_message_temp_([0-9]+)_sup_([0-9]+)$/, async (ctx) => {
  const template = await SupportTemplate.findOne({
    where: {
      id: ctx.match[1],
      userId: ctx.from.id,
    },
  });
  if (template) {
    await SupportChat.create({
      messageFrom: 0,
      supportId: ctx.match[2],
      message: template.message,
      messageId: ctx.callbackQuery.message.message_id,
    });
    await ctx.answerCbQuery(`✅ Сообщение отправлено`);
    await ctx.reply(`✅ Сообщение отправлено: ${template.message}`);
  } else {
    ctx.replyWithHTML(`❌ <b>Ошибка</b>`);
  }
});

support.action(/^support_(\d+)_send_message$/, (ctx) =>
  ctx.scene.enter("support_send_message", {
    supportId: ctx.match[1],
  })
);

support.action(/^support_check_(\d+)_online$/, async (ctx) => {
  await SupportChat.create({
    messageFrom: 0,
    supportId: ctx.match[1],
    message: `ef23f32dkd90843jhADh983d23jd9`,
    messageId: ctx.callbackQuery.message.message_id,
  });

  ctx.answerCbQuery("♻️ Проверяем онлайн...");
});

module.exports = support;
