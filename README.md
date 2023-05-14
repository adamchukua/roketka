# Roketka
## Вимоги до бази даних
1. ✅ Загальна кількість таблиць БД – 5 або більше
2. ✅ Загальна кількість атрибутів таблиць – 10 або більше. Використання всіх базових типів даних у атрибутах таблиць (числовий, рядковий, дата та час)
3. ✅ Наявність первинних ключів у всіх таблицях. За умови відсутності ключа має бути аргументовано його відсутність
4. ✅ Наявність зовнішніх ключів у 3 або більше таблицях, 1 або більше з яких мають містити посилання на 2 та більше таблиць.
5. ✅ Наявність 1 чи більше простих перевірочних обмежень, реалізованих у вигляді обмежень цілісності check або тригерів. Наявність мінімум одного складного перевірочного обмеження, що не може бути реалізовано за допомогою check та реалізоване із використанням тригерів або інших інструментів.
6. ✅ Наявність 2 (або більше) індексів, 1 (або більше) з яких є складеним (містить декілька полів таблиці).
7. ✅ Реалізація функції користувача та подальше її використання у запиті на клієнтській або серверній частині.
8. ✅ Реалізація збереженої процедури із використанням вихідного параметру або коду завершення. Має бути використано курсор та команди роботи із транзакціями.
## Вимоги до клієнтського застосунку
1. ✅ Реалізація користувацького інтерфейсу по роботі із мінімум 2-ма сутностями (вибірка із фільтрацією, додавання, зміна, видалення).
2. ❌ Виклик збереженої процедури із обробкою вихідного параметра або статусу завершення.
3. ❌ Роботу із транзакціями.
4. ✅ Під час розробки клієнтського застосунку мають використовуватись React та Redux (або React Context).
5. ✅ Обов’язково мають бути модулізація CSS, та одна з трьох дизайнових бібліотек на вибір (AntD, styled-component, material UI).
