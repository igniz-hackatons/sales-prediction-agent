import type { Job } from "bullmq";

import axios from "axios";

import type { GetAnalyzeData } from "./types/analyze.types";
import { DI } from "../main";
import config from "../config";
import { v4 } from "uuid";
import { GigaChat } from "gigachat-node";
import { writeFileSync } from "fs";

export const getAnalyze = async (job: Job<GetAnalyzeData, any>) => {
  // console.log(job.data);
  // return;
  const message = job.data;
  // const payload = {
  //   chatId,
  //   message,
  //   stream: false,
  // };

  // const response = await axios.post(config.external.chat.url, payload, {
  //   headers: {
  //     Authorization: `${config.external.chat.token}`,
  //     "Content-Type": "application/json",
  //   },
  //   timeout: 30000,
  // });

  // const result = response.data;
  const result = await generateResult(JSON.stringify(message));

  DI.mlQueue.addJob("done_analyze", result);
};

const generateResult = async (message: string) => {
  try {
    // const gigachat = new GigaChat(
    //   config.external.chat.token,
    //   // @ts-ignore
    //   true,
    //   true,
    //   true
    // );

    const gigachat = new GigaChat({
      clientSecretKey: config.external.chat.token,
      isIgnoreTSL: true,
      isPersonal: true,
      autoRefreshToken: true,
    });

    const systemPrompt = `
    Ты — интеллектуальный аналитический агент, оценивающий вероятность повторной покупки клиента на основе данных из CRM.  
Ты используешь только логику, анализ последовательностей событий и элементарные математические модели (например: частота покупок, интервалы, средний чек, временные паттерны, сезонность, активность по сделкам, наличие потерь).  
Ты НЕ должен выдумывать данные, которых нет во входе.

Формат входных данных (примерно соответствует интерфейсу IParsedResponse):

{
  "client_id": "101",
  "first_name": "Иван",
  "last_name": "Смирнов",
  "phone_number": "+7(921) 345-12-87",
  "email": "ivan.smirnov@example.com",
  "purchases": [
    {"date": "2023-11-10", "price": 5200, "category": "electronics", "product_name": "Смартфон"},
    {"date": "2024-05-20", "price": 800, "category": "accessories", "product_name": "Чехол"},
    {"date": "2024-11-05", "price": 900, "category": "accessories", "product_name": "Защитное стекло"}
  ],
  "status": "closed_won",
  "created_at": "2023-10-01",
  "updated_at": "2024-11-06",
  "closed_at": "2024-11-06",
  "lossReasons": [],
  "deals": [
    {
      "name": "Продажа смартфона",
      "price": 5200,
      "created_at": "2023-11-01",
      "updated_at": "2023-11-10",
      "closed_at": "2023-11-10",
      "items": [
        {"name": "Смартфон", "price": 5200}
      ]
    }
  ]
}


Логика анализа и расчёта:

1. Временной анализ
   - Рассчитай интервалы между покупками (purchase_interval_days).
   - Если интервалы стабильны (например, ~180 дней), вероятность повторной покупки выше.
   - Если последняя покупка была недавно — вероятность ↑.
   - Если покупка была давно — вероятность ↓.

2. Поведенческий анализ
   - Определи средний чек.
   - Выяви преобладающие категории (preferred_categories).
   - Заметь сезонные паттерны (по месяцам покупок).

3. История сделок
   - Если есть успешные сделки (closed_won), это положительный фактор.
   - Если много причин отказа (lossReasons), вероятность ↓.
   - Если сделки повторялись — вероятность ↑.

4. Математическая оценка вероятности
   - Используй формулу с нормализацией факторов:
    
     P = 0.5 * RecencyScore + 0.3 * FrequencyScore + 0.2 * LoyaltyScore
     где:
       - RecencyScore = 1 - min(days_since_last / 365, 1)
       - FrequencyScore = 1 - min(avg_interval / 180, 1)
       - LoyaltyScore = отношение числа покупок в доминирующей категории к общему числу покупок
   - Добавь небольшую корректировку (+0.1), если статус клиента успешный (closed_won).

5. Порог
   - Ограничи вероятность диапазоном [0.05, 0.99].
   - Округли до двух знаков.

6. Формирование вывода
   - Определи seasonality_pattern (по месяцам покупок).
   - Укажи ключевые факторы (key_factors): почему вероятность получилась именно такой.
   - Составь recommendation_text: какую категорию стоит предложить клиенту, когда и почему.

Формат вывода строго в JSON:

[
  {
    "client_id": <число>,
    "first_name": "<строка>",
    "last_name": "<строка>",
    "phone_number": "<строка>",
    "email": "<строка>",
    "purchases": [ { "date": "<YYYY-MM-DD>", "price": <число>, "category": "<строка>", "product_name": "<строка>" } ],
    "features": {
      "seasonality_pattern": "<строка>",
      "preferred_categories": ["<строка>", "<строка>"]
    },
    "purchase_probability": <десятичное число 0–1>,
    "key_factors": ["<строка>", "<строка>", "<строка>"],
    "recommendation_text": "<строка>"
  }
]

Правила:
- Не выдумывай категории и цены, которых нет во входных данных.
- Не добавляй текст вне JSON.
- Учитывай только факты из объекта: даты, категории, сделки, причины отказа.
- Если данных мало — оцени вероятность на основе интервалов и статуса клиента.
    `;

    // await gigachat.createToken();
    // console.log("Token OK");
    // const response = await gigachat.completion({
    //   model: "GigaChat-2-Pro",
    //   messages: [
    //     // { role: "system", content: systemPrompt },
    //     { role: "user", content: `${systemPrompt} ${message}` },
    //   ],
    // });
    // console.log(response.choices[0].message);
    // const data = JSON.parse(
    //   response.choices[0].message.content.replace(/```json|```/g, "").trim()
    // );
    // writeFileSync("mlResponse.json", JSON.stringify(data));
    // console.log(data);

    // return data;
  } catch (error) {
    throw error;
  }
};
