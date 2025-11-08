const axios = require('axios')

// Конфигурация
const CONFIG = {
  CRM: {
    DOMAIN: 'sergeyyatsuk19.amocrm.ru',
    PIPELINE_ID: 10263418,
    STAGE_ID: [81221262, 81221258, 81221254, 81221266],
    ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFlMmRlYTE4NGQzZjNjNjZjMTkyMzhjMDA3NjIxNjE3NDJiNmFiNWVkYmZkNWNkZTNiNGQ1NzI3YmQyODdiNzIyNWQ0N2IwNWNjMDljYjUyIn0.eyJhdWQiOiI1MjU1ZjM4Zi1iYjUzLTRhNTMtYTE0My0wNDk3MWZjOThjMDYiLCJqdGkiOiJhZTJkZWExODRkM2YzYzY2YzE5MjM4YzAwNzYyMTYxNzQyYjZhYjVlZGJmZDVjZGUzYjRkNTcyN2JkMjg3YjcyMjVkNDdiMDVjYzA5Y2I1MiIsImlhdCI6MTc2MjYwMjYwMSwibmJmIjoxNzYyNjAyNjAxLCJleHAiOjE3NjUwNjU2MDAsInN1YiI6IjEzMTc3ODMwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyNzQ5MDM4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiYmZmYTZhNzEtZmRmMy00OWY2LThjY2EtM2FkOGM1ODdjM2UyIiwidXNlcl9mbGFncyI6MCwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.cyq-fyoxpZiQ_r58Ge36ecOoQzPQ0YJ_3t7BgZyLYytO94iC8I6kLYJ6Bp4K80cwjEv8xBNEZKgpRlPqFwFVONsFodqvCUwm_FnK2NSMW2EbGyQSEm3kQQPJi4DL3p6VXiAHmZsc7xA3oThVWQe3bV3dtdSu3vUGx7uZ-V0Emv4RWv8LUzz_PDp1ZH70Xzp1vk_lGg0AEs_v-Lm1EO_Cd-CQdyQNGCtLcY2Sux546TH3Ipb8_nTnw5loh4HxUzLySZ5yzLZfsk9bdGpHBrPlBpFEXaEp9MS4PYnJhlpm_smV4ddmCVOX17LxwXaEPM6UUH6huw5GM5RGF6l-Dvix9Q',
    RESPONSIBLE_USER_ID: 13177830, // Замените на ID пользователя вашей CRM
  },
};

const api = axios.create({
  baseURL: `https://${CONFIG.CRM.DOMAIN}/api/v4`,
  headers: {
    Authorization: `Bearer ${CONFIG.CRM.ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const firstNames = ['Александр','Максим','Дмитрий','Андрей','Сергей','Иван','Егор','Артём','Никита','Роман','Виктор','Михаил','Кирилл','Олег','Тимофей'];
const lastNames  = ['Иванов','Петров','Сидоров','Кузнецов','Попов','Смирнов','Воробьёв','Морозов','Волков','Новиков','Фролов','Егоров','Соколов','Лебедев','Зайцев'];
const patronymics = ['Александрович','Сергеевич','Дмитриевич','Иванович','Петрович','Андреевич','Николаевич','Викторович','Михайлович','Романович'];

const companyPrefixes = ['ООО', 'ЗАО', 'АО', 'ИП', 'ТД', 'ГК'];
const companyNames = ['Техно', 'Энергo', 'Медиa', 'Пром', 'Альфа', 'Вектор', 'Системы', 'ПРО', 'Лаб', 'Снаб'];
const companyTails = ['Сервис', 'Групп', 'Инвест', 'Логистика', 'Проект', 'Решения', 'Трейд', 'Ком', 'Девелопмент'];

const streets = ['Ленина','Пушкинская','Мира','Советская','Октябрьская','Кирова','Гагарина','Чапаева','Комсомольская','Гоголя'];

function rand(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

function generatePhone(){
  const prefix = 900 + Math.floor(Math.random()*100); 
  const a = String(Math.floor(Math.random()*900)+100);
  const b = String(Math.floor(Math.random()*90)+10);
  const c = String(Math.floor(Math.random()*90)+10);
  return `+7${prefix}${a}${b}${c}`;
}

function generateCompanyDomain(name){
  // domain like alphagroup.ru
  const base = name.toLowerCase().replace(/[^a-zа-яё0-9]+/g, '').replace(/[а-яё]/g, c => translitMap[c] || c);
  return `${base}.ru`;
}

// translit map for simple russian->latin
const translitMap = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m',
  'н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'shch','ъ':'',
  'ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
};

function generatePerson(){
  const first = rand(firstNames);
  const last = rand(lastNames);
  const patronymic = rand(patronymics);
  return {
    first_name: first,
    last_name: last,
    name: `${last} ${first} ${patronymic}`,
    simpleFirst: first.toLowerCase(),
    simpleLast: last.toLowerCase(),
  };
}

function generateCompanyName(){
  const prefix = rand(companyPrefixes);
  const name = rand(companyNames) + rand(companyTails);
  return `${prefix} ${name}`;
}

function generateAddress(){
  const street = rand(streets);
  const house = randInt(1,200);
  const city = 'Москва';
  const postal = String(100000 + Math.floor(Math.random()*899999));
  return `${city}, ул. ${street}, д. ${house}, ${postal}`;
}

// === Функция: получить все кастомные поля для типа ===
async function getCustomFields(type){
  try {
    const res = await api.get(`/${type}/custom_fields`);
    return (res.data._embedded && res.data._embedded.custom_fields) || [];
  } catch (err){
    console.error(`Ошибка получения custom_fields для ${type}:`, err.response?.data || err.message);
    return [];
  }
}

// Попытка детектировать тип "телефон", "email", "address" по метаданным поля
function detectLogicalFieldType(field){
  const name = (field.name || '').toLowerCase();
  const code = (field?.code || '').toLowerCase();
  const ftype = (field.field_type || '').toLowerCase();
  if (code.includes('phone') || name.includes('тел') || ftype.includes('phone') || name.includes('моб')) return 'phone';
  if (code.includes('email') || name.includes('почт') || name.includes('email') || ftype.includes('email')) return 'email';
  if (name.includes('адрес') || name.includes('address') || ftype.includes('streetaddress')) return 'address';
  if (ftype.includes('date') || name.includes('дата')) return 'date';
  if (ftype.includes('numeric') || ftype.includes('money') || name.includes('сумма') || name.includes('стоимость')) return 'numeric';
  if (ftype.includes('url')) return 'url';
  // fallback
  if (ftype.includes('text') || ftype.includes('textarea') || name.length>0) return 'text';
  return 'text';
}

// Сформировать значение для кастомного поля, принимая контекст
function makeValueForField(field, context){
  const logical = detectLogicalFieldType(field);
  // context: {person, company, companyDomain, dealAmount, dealCloseDate, address}
  switch(logical){
    case 'phone':
      // amoCRM ожидает массив значений, каждое {value, enum?}
      return [{ value: context.phone }];
    case 'email':
      return [{ value: context.email }];
    case 'address':
      return [{ value: context.address }];
    case 'date':
      // формат YYYY-MM-DD
      return [{ value: context.dealCloseDate || (new Date().toISOString().split('T')[0]) }];
    case 'numeric':
      return [{ value: (context.dealAmount != null) ? context.dealAmount : randInt(1000, 50000) }];
    case 'url':
      return [{ value: `https://${context.companyDomain}` }];
    case 'text':
    default:
      // если в названии поля есть "ИНН"/"kpp" и т.д. можно подставить цифры, но для простоты:
      const txt = `${field.name} ${randInt(1,999)}`;
      return [{ value: txt }];
  }
}

// Создать компанию (с реальными данными)
async function createCompany(companyFields, idx){
  const cmpName = generateCompanyName();
  const companyDomain = generateCompanyDomain(cmpName);
  const address = generateAddress();

  const context = {
    companyDomain,
    address,
    phone: generatePhone(),
    email: `contact@${companyDomain}`
  };

  const custom_fields_values = companyFields.map(f => {
    // при генерации для компании используем company-context
    const vals = makeValueForField(f, { ...context, dealAmount: randInt(100000,500000) });
    return { field_id: f.id, values: vals };
  });

  const body = [{
    name: cmpName,
    responsible_user_id: CONFIG.CRM.RESPONSIBLE_USER_ID,
    custom_fields_values
  }];

  const res = await api.post('/companies', body);
  const company = res.data._embedded.companies[0];
  return {
    id: company.id,
    name: cmpName,
    domain: companyDomain,
    address,
    phone: context.phone,
    email: context.email,
  };
}

// Создать контакт и привязать к компании
async function createContact(contactFields, company){
  const person = generatePerson();
  const phone = generatePhone();
  const email = `${person.simpleFirst}.${person.simpleLast}@${company.domain}`;

  const context = {
    person,
    phone,
    email,
    address: company.address,
    companyDomain: company.domain
  };

  const custom_fields_values = contactFields.map(f => {
    const vals = makeValueForField(f, context);
    return { field_id: f.id, values: vals };
  });

  const body = [{
    name: person.name,
    first_name: person.first_name,
    last_name: person.last_name,
    responsible_user_id: CONFIG.CRM.RESPONSIBLE_USER_ID,
    _embedded: { companies: [{ id: company.id }] },
    custom_fields_values
  }];

  const res = await api.post('/contacts', body);
  const contact = res.data._embedded.contacts[0];
  return {
    id: contact.id,
    name: person.name,
    phone,
    email,
    first_name: person.first_name,
    last_name: person.last_name
  };
}

// Создать сделку, привязать к контакту и компании
async function createDeal(dealFields, contact, company, pattern='monthly'){
  const amount = randInt(50000, 800000);
  const dates = generateDealDates(pattern);

  const context = {
    dealAmount: amount,
    dealCloseDate: dates.closed_at,
    companyDomain: company.domain,
    phone: contact.phone,
    email: contact.email,
    address: company.address
  };

  const custom_fields_values = dealFields.map(f => {
    const vals = makeValueForField(f, context);
    return { field_id: f.id, values: vals };
  });

  const body = [{
    name: `Продажа ${company.name} — ${contact.last_name}`,
    pipeline_id: CONFIG.CRM.PIPELINE_ID,
    status_id: CONFIG.CRM.STAGE_ID[Math.floor(Math.random() * CONFIG.CRM.STAGE_ID.length)],
    responsible_user_id: CONFIG.CRM.RESPONSIBLE_USER_ID,
    price: amount,
    created_at: dates.created_at, // UNIX timestamp
    custom_fields_values,
    _embedded: {
      contacts: [{ id: contact.id }],
      companies: [{ id: company.id }]
    }
  }];

  const res = await api.post('/leads', body);
  const lead = res.data._embedded.leads[0];
  return {
    id: lead.id,
    name: body[0].name,
    amount,
    created_at: dates.created_at,
    closed_at: dates.closed_at
  };
}

// Генерация даты сделки по паттерну покупок
function generateDealDates(pattern) {
  const now = new Date();
  let created, closed;

  switch(pattern) {
    case 'monthly':
      // последние 3 месяца кроме текущего
      const monthOffset = randInt(1, 3);
      created = new Date(now.getFullYear(), now.getMonth() - monthOffset, randInt(1,28));
      closed = new Date(created);
      closed.setDate(closed.getDate() + randInt(1,7)); // закрытие через 1-7 дней
      break;

    case 'half_yearly':
      // каждые 6 месяцев за последний год
      const pastMonths = [6, 12];
      const offset = rand(pastMonths);
      created = new Date(now.getFullYear(), now.getMonth() - offset, randInt(1,28));
      closed = new Date(created);
      closed.setDate(closed.getDate() + randInt(3,14));
      break;

    case 'yearly':
      // последние 2 года кроме текущего
      const yearOffset = randInt(1,2);
      created = new Date(now.getFullYear() - yearOffset, randInt(0,11), randInt(1,28));
      closed = new Date(created);
      closed.setDate(closed.getDate() + randInt(7,21));
      break;

    default:
      // fallback: случайная дата за последние 3 месяца
      created = new Date(now.getFullYear(), now.getMonth() - randInt(0,2), randInt(1,28));
      closed = new Date(created);
      closed.setDate(closed.getDate() + randInt(1,10));
      break;
  }

  return { created_at: Math.floor(created.getTime()/1000), closed_at: closed.toISOString().split('T')[0] };
}

// === main ===
async function main(){
  console.log('Запуск генерации реалистичных данных в amoCRM...');

  // Получаем кастомные поля (если их нет, массивы будут пустыми и скрипт всё равно создаст объекты с минимальным набором)
  const companyFields = await getCustomFields('companies');
  const contactFields = await getCustomFields('contacts');
  const dealFields = await getCustomFields('leads');

  const created = [];

  for (let i=0;i<15;i++){
    try{
      // Создаем компанию
      const company = await createCompany(companyFields, i+1);
      // Небольшая пауза
      await sleep(250);

      // Создаем контакт (и привяжем к компании)
      const contact = await createContact(contactFields, company);
      await sleep(200);

      // Создаем 2-3 сделки
      const deals = [];
        const dealPatterns = ['monthly','half_yearly','yearly'];
        for (let d=0; d<dealPatterns.length; d++){
            const deal = await createDeal(dealFields, contact, company, dealPatterns[d]);
            deals.push(deal);
            await sleep(200);
        }

      created.push({ company, contact, deals });
      console.log(`✅ [${i+1}] Созданы: Компания "${company.name}" (id:${company.id}), Контакт "${contact.name}" (id:${contact.id})`);
    }catch(err){
      console.error('Ошибка при создании данных:', err.response?.data || err.message);
      // не прерываем весь цикл — переходим к следующему
    }
    // дополнительная пауза между итерациями
    await sleep(400);
  }

  console.log('Генерация завершена. Создано объектов:', created.length);
}

main().catch(err => console.error('Fatal error:', err));