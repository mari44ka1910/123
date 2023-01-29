// ІМПОРТУЄМО БІБЛІОТЕКИ БЕЗ ЯКИХ НЕ МОЖЕМО ПИСАТИ КОД
import React from "react";
import styled from "styled-components";

// ІМПОРТУЄМО ПОТРІБНІ КОМПОНЕНТИ
import Page from "./component/Page";
import Header from "./component/Header";
import Balance from "./component/Balance";
import Menu from "./component/Menu";
import Payment from "./component/Payment";

// КОНФІГУРАЦІЯ ========================================

const START_BALANCE = 0;
const LIMIT_BALANCE = 10000;
const GET_MONEY = 100;

const SALARY_AMOUNT = 1000;
const COURSE_PRICE = 850;

export default function App() {
  // ФУНКЦІОНАЛ БАЛАНСУ ========================

  // Ось тут тримаємо актуальне значення балансу

  const [balance, setBalance] = React.useState(START_BALANCE);

  // Функція для прямого поповнення балансу
  const getMoney = () => setBalance(balance + GET_MONEY);

  // Функція яка виконується кожен раз коли наш баланс змінився
  React.useEffect(() => {
    // Перевірка на ліміт балансу
    if (balance > LIMIT_BALANCE) {
      alert(`Ваш ліміт балансу: ${LIMIT_BALANCE}`);
      setBalance(START_BALANCE);
    }

    // Перевірка на мінусовий баланс
    if (balance < 0) {
      alert(`Ви використали усі свої гроші. Поповніть картку`);
      // setBalance(0);
    }
    // Сюди записуються змінні при оновленні яких буде виконуватися функція
  }, [balance]);

  // функціонал транзакцій ===================

  const [payment, setPayment] = React.useState([]);

  const get = () => {
    setBalance(balance + GET_MONEY);

    setPayment([
      {
        name: `Поповнення балансу`,
        amount: GET_MONEY,
        type: "+"
      },
      ...payment
    ]);
  };

  const getSalary = () => {
    setBalance(balance + SALARY_AMOUNT);

    setPayment([
      {
        name: `Зарплата`,
        amount: SALARY_AMOUNT,
        type: "+"
      },
      ...payment
    ]);
  };

  const buyCource = () => {
    setBalance(balance - COURSE_PRICE);

    setPayment([
      {
        name: `Плата курсу`,
        amount: COURSE_PRICE,
        type: "-"
      },
      ...payment
    ]);
  };

  const buyfood = () => {
    setBalance(balance - 20);

    setPayment([
      {
        name: `Покупка їжі`,
        amount: 20,
        type: "*"
      },
      ...payment
    ]);
  };

  // ВЕРСТКА ІНТЕРФЕЙСУ ==========================================

  const LOGIN = `turaiv`;
  const PASSWORD = `1234`;

  const [isLogged, setLogged] = React.useState(false);

  const doLogin = () => {
    const login = prompt("Ваш логін");
    const password = prompt(`Ваш пароль`);

    if (login === LOGIN && password === PASSWORD) {
      alert(`Ви увійшли!`);
      setLogged(true);
    } else {
      if (login !== LOGIN && password !== PASSWORD) {
        return alert(`Помилка в логіні та паролі`);
      }

      if (login === LOGIN) {
        return alert(`Помилка в логіні`);
      }

      if (password !== PASSWORD) {
        return alert(`Помилка в паролі`);
      }
    }
  };

  return (
    <Page>
      {/* компонент шапки з нашою назвою
          також при кліку мишкою на шапку
          в нас визивається функція HelloWorld
      */}

      <Header name="Standart BANK" onClick={doLogin} />

      {/* Компонент баланса в який передається
          Актуальне значення балансу  */}
      {isLogged && <Balance balance={balance} />}

      {/* Компонент меню з кнопками */}
      {isLogged && (
        <Menu
          // ось сюди ми передаємо конфігурацію кнопок
          config={[
            {
              name: "Поповнити баланс",
              onClick: getMoney,
              img: "/icon/dog.svg"
            },
            {
              name: "Отримати зарплату",
              onClick: getSalary,
              img: "/icon/apple.svg"
            },
            {
              name: "Купити курс",
              onClick: buyCource,
              img: "/icon/payment.svg"
            },
            {
              name: "Купити їжу в Glovo",
              onClick: buyfood,
              img: "/icon/snake.svg"
            }
          ]}
        />
      )}
      {/* компонент списка наших транзакцій
          цей функціонал ми будемо робити на 3 уроці
      */}
      {isLogged && <Payment payment={payment} />}
      {isLogged === false && (
        <NotLogged>Вам потрібно увійти в акаунт </NotLogged>
      )}
    </Page>
  );
}

const NotLogged = styled.div`
pading: 100px 30px;
background: #000
color: #fff
text-align: center;
margin-top: 100px; 

border-top-left-radius: 30px;
border-top-right-radius: 30px;
`;
