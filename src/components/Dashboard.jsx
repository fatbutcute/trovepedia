import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DailyWeeklyBuffs from './DailyWeeklyBuffs';

export default function Dashboard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formatCountdown = (diff) => {
    if (diff <= 0) return "00:00:00";
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getDailyReset = () => {
    const res = new Date(now);
    res.setUTCHours(11, 0, 0, 0);
    if (now > res) res.setUTCDate(res.getUTCDate() + 1);
    return res;
  };

  const getWeeklyReset = () => {
    const res = new Date(now);
    res.setUTCHours(11, 0, 0, 0);
    const day = res.getUTCDay();
    let daysToMonday = (1 - day + 7) % 7;
    if (day === 1 && now > res) daysToMonday = 7;
    res.setUTCDate(res.getUTCDate() + daysToMonday);
    return res;
  };

  const dailyDiff = getDailyReset() - now;
  const dailyProgress = ((86400000 - dailyDiff) / 86400000) * 100;

  const weeklyDiff = getWeeklyReset() - now;
  const weeklyProgress = ((604800000 - weeklyDiff) / 604800000) * 100;

  const offset = -now.getTimezoneOffset() / 60;
  const tzLabel = `LOCAL TIME (GMT${offset >= 0 ? '+' : ''}${offset})`;

  return (
    <section className="status-outer-wrapper">
      <div className="status-container">
        
        {/* CURRENT TIME - Ikonnal */}
        <div className="timer-card">
          <div className="timer-header">
            <i className="ri-time-line"></i> CURRENT TIME
          </div>
          <div className="time-val">{formatTime(now)}</div>
          <div className="meta-container">
            <div className="tz-display">{tzLabel}</div>
          </div>
        </div>

        {/* DAILY RESET - Ikonnal */}
        <div className="timer-card accent-blue">
          <div className="timer-header">
            <i className="ri-sun-cloudy-line"></i> DAILY RESET
          </div>
          <div className="time-val">{formatCountdown(dailyDiff)}</div>
          <div className="meta-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${dailyProgress}%` }}></div>
            </div>
          </div>
        </div>

        {/* WEEKLY RESET - Ikonnal */}
        <div className="timer-card accent-yellow">
          <div className="timer-header">
            <i className="ri-calendar-todo-line"></i> WEEKLY RESET
          </div>
          <div className="time-val">{formatCountdown(weeklyDiff)}</div>
          <div className="meta-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${weeklyProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      <DailyWeeklyBuffs />
      
    </section>
    
  );
}