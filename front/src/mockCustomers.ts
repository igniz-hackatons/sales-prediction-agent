import type { Customer } from './types';

export const mockCustomers: Customer[] = [
  {
    'client_id': 102,
    'first_name': 'Мария',
    'last_name': 'Петрова',
    'phone_number': '+7(912) 456-78-90',
    'email': 'maria.petrova@example.com',
    'purchases': [
      {
        'date': '2023-12-15',
        'price': 4500,
        'category': 'cosmetics',
        'product_name': 'Увлажняющий крем'
      },
      {
        'date': '2024-03-22',
        'price': 2300,
        'category': 'cosmetics',
        'product_name': 'Тоник для лица'
      },
      {
        'date': '2024-06-10',
        'price': 3100,
        'category': 'cosmetics',
        'product_name': 'Сыворотка'
      }
    ],
    'features': {
      'seasonality_pattern': 'spring',
      'preferred_categories': ['cosmetics']
    },
    'purchase_probability': 0.76,
    'key_factors': [
      'активность весной',
      'предпочитает уходовую косметику',
      'средняя частота покупок'
    ],
    'recommendation_text': 'Рекомендуем предложить Марии Петровой новую линейку уходовой косметики, особенно в преддверии весны. Последняя покупка была 6 месяцев назад, что соответствует её циклу.'
  },
  {
    'client_id': 103,
    'first_name': 'Алексей',
    'last_name': 'Кузнецов',
    'phone_number': '+7(981) 234-56-78',
    'email': 'alex.kuznetsov@example.com',
    'purchases': [
      {
        'date': '2023-09-01',
        'price': 15000,
        'category': 'sports',
        'product_name': 'Велосипед'
      },
      {
        'date': '2024-04-18',
        'price': 2800,
        'category': 'sports',
        'product_name': 'Спортивная форма'
      },
      {
        'date': '2024-07-25',
        'price': 1200,
        'category': 'sports',
        'product_name': 'Бутылка для воды'
      }
    ],
    'features': {
      'seasonality_pattern': 'summer',
      'preferred_categories': ['sports']
    },
    'purchase_probability': 0.89,
    'key_factors': [
      'высокая активность летом',
      'предпочитает спортивные товары',
      'частые покупки в категории sports'
    ],
    'recommendation_text': 'Алексею Кузнецову можно предложить летние спортивные товары и аксессуары. Последняя покупка была 4 месяца назад, пора напомнить о себе.'
  },
  {
    'client_id': 104,
    'first_name': 'Елена',
    'last_name': 'Волкова',
    'phone_number': '+7(905) 678-90-12',
    'email': 'elena.volkova@example.com',
    'purchases': [
      {
        'date': '2023-11-20',
        'price': 3200,
        'category': 'books',
        'product_name': 'Роман'
      },
      {
        'date': '2024-02-14',
        'price': 1500,
        'category': 'books',
        'product_name': 'Поэзия'
      },
      {
        'date': '2024-10-30',
        'price': 4100,
        'category': 'books',
        'product_name': 'Учебное пособие'
      }
    ],
    'features': {
      'seasonality_pattern': 'autumn',
      'preferred_categories': ['books']
    },
    'purchase_probability': 0.72,
    'key_factors': [
      'активность осенью и зимой',
      'любит книги разных жанров',
      'умеренная частота покупок'
    ],
    'recommendation_text': 'Рекомендуем предложить Елене Волковой новые книги, особенно в преддверии зимы. Последняя покупка была месяц назад, можно предложить что-то новое.'
  },
  {
    'client_id': 105,
    'first_name': 'Дмитрий',
    'last_name': 'Соколов',
    'phone_number': '+7(921) 987-65-43',
    'email': 'dmitry.sokolov@example.com',
    'purchases': [
      {
        'date': '2023-08-05',
        'price': 25000,
        'category': 'electronics',
        'product_name': 'Ноутбук'
      },
      {
        'date': '2024-01-12',
        'price': 5600,
        'category': 'electronics',
        'product_name': 'Наушники'
      },
      {
        'date': '2024-09-18',
        'price': 8900,
        'category': 'electronics',
        'product_name': 'Планшет'
      }
    ],
    'features': {
      'seasonality_pattern': 'winter',
      'preferred_categories': ['electronics']
    },
    'purchase_probability': 0.68,
    'key_factors': [
      'предпочитает электронику',
      'активность зимой',
      'редкие, но дорогие покупки'
    ],
    'recommendation_text': 'Дмитрию Соколову можно предложить новинки в категории электроники. Последняя покупка была 2 месяца назад, но его цикл — 8 месяцев.'
  },
  {
    'client_id': 106,
    'first_name': 'Анна',
    'last_name': 'Морозова',
    'phone_number': '+7(910) 111-22-33',
    'email': 'anna.morozova@example.com',
    'purchases': [
      {
        'date': '2023-10-10',
        'price': 1800,
        'category': 'clothing',
        'product_name': 'Куртка'
      },
      {
        'date': '2024-01-25',
        'price': 2400,
        'category': 'clothing',
        'product_name': 'Свитер'
      },
      {
        'date': '2024-11-01',
        'price': 3100,
        'category': 'clothing',
        'product_name': 'Пальто'
      }
    ],
    'features': {
      'seasonality_pattern': 'autumn',
      'preferred_categories': ['clothing']
    },
    'purchase_probability': 0.91,
    'key_factors': [
      'активность осенью и зимой',
      'предпочитает верхнюю одежду',
      'стабильная частота покупок'
    ],
    'recommendation_text': 'Анне Морозовой рекомендуем предложить актуальные новинки в одежде. Последняя покупка была 10 дней назад, но можно предложить аксессуары.'
  },
  {
    'client_id': 107,
    'first_name': 'Ольга',
    'last_name': 'Федорова',
    'phone_number': '+7(916) 444-55-66',
    'email': 'olga.fedorova@example.com',
    'purchases': [
      {
        'date': '2023-05-20',
        'price': 3500,
        'category': 'home',
        'product_name': 'Постельное белье'
      },
      {
        'date': '2023-12-15',
        'price': 4200,
        'category': 'home',
        'product_name': 'Шторы'
      },
      {
        'date': '2024-08-30',
        'price': 2800,
        'category': 'home',
        'product_name': 'Ковер'
      }
    ],
    'features': {
      'seasonality_pattern': 'autumn',
      'preferred_categories': ['home']
    },
    'purchase_probability': 0.74,
    'key_factors': [
      'активность осенью',
      'предпочитает товары для дома',
      'покупки раз в полгода'
    ],
    'recommendation_text': 'Рекомендуем предложить Ольге Федоровой товары для дома, особенно в преддверии осени. Последняя покупка была 3 месяца назад.'
  }
];
