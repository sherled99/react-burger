import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./Order.module.css";
import { useSelector } from "../../services/hooks";
import {FC} from "react";
import { IIngredient, IOrder } from "../../services/types/data";

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();

const getGMT = (date: Date) => {
  const timeZoneOffset = date.getTimezoneOffset();
  const gmtOffset = timeZoneOffset / 60;
  const sign = gmtOffset > 0 ? "-" : "+";
  const hours = Math.abs(Math.floor(gmtOffset));
  const gmtString = `${sign}${hours}`;
  return `i-GMT ${gmtString}`;
};

export const getDate = (createdAt: Date) => {
  const orderDate = new Date(createdAt);
  const day = orderDate.getDate();
  const month = orderDate.getMonth();
  let date = "";
  if (day === currentDate && month === currentMonth) {
    date = "Сегодня";
  } else if (day + 1 === currentDate && month === currentMonth) {
    date = "Вчера";
  } else {
    if (month === currentMonth) {
      date = `${currentDate - day} дня назад`;
    }
  }
  if (date) {
    return `${date} ${orderDate.getHours()}:${
      orderDate.getMinutes() < 10
        ? "0" + orderDate.getMinutes()
        : orderDate.getMinutes()
    } ${getGMT(orderDate)}`;
  } else {
    return `${orderDate.getFullYear()} ${
      orderDate.getMonth() + 1
    } ${orderDate.getHours()}:${
      orderDate.getMinutes() < 10
        ? "0" + orderDate.getMinutes()
        : orderDate.getMinutes()
    } ${getGMT(orderDate)}`;
  }
};

export const getStatus = (status: string) => {
  if (status === "pending") {
    status = "Готовится";
  } else if (status === "created") {
    status = "Создан";
  } else {
    status = "Выполнен";
  }
  return status;
};

type OrderType = {
  props: IOrder
}

export const Order: FC<OrderType> = ({props}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector(state => state.burgerState.burgerIngredients);
  let sum = 0;
  props.ingredients.map(i => {
    const ingredient = data.find(el => el._id === i);
    if (ingredient) {
      sum += ingredient.price;
    }
  });

  const open = () => {
    location.pathname === "/profile/orders"
      ? navigate(`/profile/orders/${props._id}`, {
          state: { backgroundLocation: true },
        })
      : navigate(`/feed/${props._id}`, { state: { backgroundLocation: true } });
  };
  return (
    <div
      className={
        location.pathname === "/feed"
          ? style.main_contaier
          : style.main_contaier_porfile
      }
      onClick={open}
    >
      <div className={`${style.nuber_container}`}>
        <p className="text text_type_digits-default">{`#${props.number}`}</p>
        <p className={`${style.color_text} text text_type_main-small`}>
          {getDate(props.createdAt)}
        </p>
      </div>
      <h2 className={`${style.title} text text text_type_main-medium`}>
        {props.name}
      </h2>
      {location.pathname !== "/feed" && (
        <p
          className={`${
            props.status === "done" && style.status_done
          } text text_type_main-small pl-6`}
        >
          {getStatus(props.status)}
        </p>
      )}
      <div className={`${style.main_container} p-6`}>
        <div className={style.img_container}>
          {data.length > 0 &&
            props.ingredients.map((i, index) => {
              if (index === 5) {
                return (
                  <Image
                    ingredientId={i}
                    last={true}
                    count={props.ingredients.length}
                    data={data}
                    key={index}
                  />
                );
              } else if (index > 5) {
                return;
              }
              return <Image ingredientId={i} data={data} key={index} />;
            })}
        </div>
        <div className={style.price__container}>
          <p className="text text_type_digits-default mr-2">{`${sum}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

type ImageProps = {
  ingredientId: string;
  data: IIngredient[];
  last?: boolean;
  count?: number;
};

const Image: FC<ImageProps> = ({ ingredientId, data, last, count }) => {
  const ingredient = data.find(el => el._id === ingredientId);
  let src: string | undefined = undefined;
  if (ingredient) {
    src = ingredient.image_mobile;
  }

  if (last && count != undefined) {
    const lastCount = `+${count - 5}`;
    return (
      <div className={style.relative}>
        <img src={src} className={style.image} alt="" />
        <div className={style.text_overlay}>
          <p className="text text_type_main-small">{lastCount}</p>
        </div>
      </div>
    );
  }
  return <img src={src} className={style.image} alt="" />;
};