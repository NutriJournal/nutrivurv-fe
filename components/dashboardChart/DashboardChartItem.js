import { useState } from 'react';

import FullHeartSVG from '../svg/FullHeartSVG.js';
import HeartOutlineSVG from '../svg/HeartOutlineSVG.js';
import { CenteredContainer, Spacer } from '../Layout/LayoutPrimitives.js';
import UpdateServingQtyInput from './UpdateServingQtyInput.js';
import { formatDate } from '../../lib/utils.js';

const DashboardChartItem = ({
  data,
  toggleFav,
  deleteRecord,
  reLogFood,
  isDailyRecord,
}) => {
  const [item, setItem] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const { calories, fat, protein, carbs, food_string, id, quantity } = item;

  const { quantity: baseQty, measure, food, favorite } = JSON.parse(
    food_string
  );
  const currentDate = formatDate(new Date(Date.now()));

  return (
    <div className="w-full flex">
      <div className="flex w-5/12 items-center">
        <div className="w-1/12">
          <CenteredContainer>
            <i
              className="cursor-pointer"
              onClick={() => setItem(toggleFav(item))}
            >
              {favorite ? <FullHeartSVG /> : <HeartOutlineSVG />}
            </i>
          </CenteredContainer>
        </div>
        <div className="flex flex-col w-7/12">
          {isEditing ? (
            <UpdateServingQtyInput
              item={item}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              quantity={quantity}
            />
          ) : (
            <div className={`flex w-11/12 pl-3 items-center`}>
              {`${quantity ? quantity : baseQty} ${measure} ${food}`}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-7/12 justify-center items-center">
        <div className="w-1/6 text-sm text-center">{calories}</div>
        <div className="w-1/6 text-sm text-center">{fat}g</div>
        <div className="w-1/6 text-sm text-center">{protein}g</div>
        <div className="w-1/6 text-sm text-center">{carbs}g</div>
        <Spacer />
        <div className="flex w-1/3 pr-2 py-2">
          {!isDailyRecord ? (
            <div
              className="flex flex-col justify-end items-center w-1/3 text-xs text-right cursor-pointer"
              onClick={() =>
                reLogFood({
                  ...item,
                  date: currentDate,
                })
              }
            >
              <i>
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </i>
              <div>add</div>
            </div>
          ) : (
            <div className="w-1/3"></div>
          )}
          <div
            className="flex flex-col justify-end items-center w-1/3 text-xs text-right cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i>
              <svg
                width="12"
                height="12"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 14.4605V17.5001C0 17.78 0.21997 18 0.499932 18H3.53952C3.6695 18 3.79948 17.95 3.88947 17.85L14.808 6.9415L11.0585 3.19201L0.14998 14.1005C0.0499933 14.2005 0 14.3205 0 14.4605ZM17.7076 4.0419C17.8003 3.94939 17.8738 3.83952 17.924 3.71856C17.9742 3.59761 18 3.46794 18 3.33699C18 3.20604 17.9742 3.07638 17.924 2.95542C17.8738 2.83446 17.8003 2.72459 17.7076 2.63209L15.3679 0.292404C15.2754 0.199713 15.1655 0.126176 15.0446 0.0760011C14.9236 0.0258265 14.794 0 14.663 0C14.5321 0 14.4024 0.0258265 14.2814 0.0760011C14.1605 0.126176 14.0506 0.199713 13.9581 0.292404L12.1284 2.12216L15.8778 5.87165L17.7076 4.0419Z"
                  fill="#363537"
                />
              </svg>
            </i>
            <div>edit</div>
          </div>
          <div
            className="flex flex-col justify-end items-center w-1/3 text-xs text-right cursor-pointer"
            onClick={() => deleteRecord(id)}
          >
            <i>
              <svg
                width="18"
                height="18"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.1353 6.68843V6.09C12.1353 5.76142 12.4674 5.49357 12.8751 5.49357H17.0263C17.435 5.49357 17.7671 5.76142 17.7671 6.09V6.68843H12.1353ZM21.1269 8.181C21.0404 10.4363 20.5045 24.2548 20.4368 24.8771C20.3971 25.2495 20.2599 25.4327 20.1863 25.5064H9.71511C9.64054 25.4327 9.50431 25.2495 9.46454 24.8771C9.39792 24.2548 8.79835 10.4463 8.70091 8.181H21.1269ZM19.2526 6.68843V6.09C19.2526 4.93697 18.3209 4 17.1745 4H12.7269C11.5805 4 10.6488 4.93697 10.6488 6.09V6.68843H6.2002V8.181H7.2144L7.98599 25.4198C7.99892 25.4835 8.33002 27 9.6117 27H20.2877C21.5704 27 21.9015 25.4835 21.9214 25.371L22.6502 8.181H23.7002V6.68843H19.2526ZM18.9501 9.37706H17.4635L17.0002 24.3118H18.4867L18.9501 9.37706ZM14.2067 24.312H15.6932V9.37725H14.2067V24.312ZM12.9001 24.3118L12.4367 9.37706H10.9502L11.4126 24.3118H12.9001Z"
                  fill="#363537"
                />
              </svg>
            </i>
            <div>delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChartItem;
