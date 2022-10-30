import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const CountdownTimer = ({ date }) => {
  const countDownDate = new Date(date).getTime();
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }, [countDownDate]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.time}>
        <div className={styles.value}>{time.days}</div>
        <div className={styles.unit}>Days</div>
      </div>
      <div className={styles.time}>
        <div className={styles.value}>{time.hours}</div>
        <div className={styles.unit}>Hours</div>
      </div>
      <div className={styles.time}>
        <div className={styles.value}>{time.minutes}</div>
        <div className={styles.unit}>Minutes</div>
      </div>
      <div className={styles.time}>
        <div className={styles.value}>{time.seconds}</div>
        <div className={styles.unit}>Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
