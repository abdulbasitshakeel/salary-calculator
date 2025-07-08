import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [salary, setSalary] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [timeUnit, setTimeUnit] = useState('monthly');
  const [workDays, setWorkDays] = useState(26);
  const [workHours, setWorkHours] = useState(8);
  const [results, setResults] = useState({
    daily: 0,
    hourly: 0,
    minute: 0,
    monthly: 0,
    yearly: 0
  });


  useEffect(() => {
    calculateEarnings();
  }, [salary, timeUnit, workDays, workHours]);

  const calculateEarnings = () => {
    if (!salary || isNaN(salary) || salary <= 0) {
      setResults({
        daily: 0,
        hourly: 0,
        minute: 0,
        monthly: 0,
        yearly: 0
      });
      return;
    }

    const salaryValue = parseFloat(salary);
    let monthlySalary = salaryValue;

    switch (timeUnit) {
      case 'yearly': monthlySalary = salaryValue / 12; break;
      case 'weekly': monthlySalary = salaryValue * 4; break;
      case 'daily': monthlySalary = salaryValue * workDays; break;
      case 'hourly': monthlySalary = salaryValue * workHours * workDays; break;
      default: break;
    }

    const dailyEarning = monthlySalary / workDays;
    const hourlyEarning = dailyEarning / workHours;
    const minuteEarning = hourlyEarning / 60;
    const yearlyEarning = monthlySalary * 12;

    setResults({
      daily: dailyEarning.toFixed(2),
      hourly: hourlyEarning.toFixed(2),
      minute: minuteEarning.toFixed(2),
      monthly: monthlySalary.toFixed(2),
      yearly: yearlyEarning.toFixed(2)
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setSalary(value);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-PK', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(value);
  };


  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h1>Salary Calculator</h1>
        <p>Calculate your earnings in different time units</p>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label>Your Salary:</label>
          <div className="input-with-unit">
            <input
              type="text"
              value={salary}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
            >
              <option value="monthly">Monthly </option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
        </div>

        <div className="work-conditions">
          <div className="small-input-group">
            <label>Work Days:</label>
            <input
              type="number"
              value={workDays}
              onChange={(e) => setWorkDays(parseInt(e.target.value) || 0)}
              min="1"
              max="31"
            />
          </div>

          <div className="small-input-group">
            <label>Hours:</label>
            <input
              type="number"
              value={workHours}
              onChange={(e) => setWorkHours(parseInt(e.target.value) || 0)}
              min="1"
              max="24"
            />
          </div>

        <div className="small-input-group">
          <label>Currency:</label>
          <div className="input-with-unit">
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="PKR">PKR (₨)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>

        </div>
      </div>

      <div className="results-section">
        <h2>Earnings Breakdown</h2>
        
        <div className="result-grid">
          <div className="result-card">
            <div className="result-label">Monthly</div>
            <div className="result-value">{formatCurrency(results.monthly)}</div>
          </div>
          
          <div className="result-card">
            <div className="result-label">Yearly</div>
            <div className="result-value">{formatCurrency(results.yearly)}</div>
          </div>
          
          <div className="result-card">
            <div className="result-label">Daily</div>
            <div className="result-value">{formatCurrency(results.daily)}</div>
          </div>
          
          <div className="result-card">
            <div className="result-label">Hourly</div>
            <div className="result-value">{formatCurrency(results.hourly)}</div>
          </div>
          
          <div className="result-card">
            <div className="result-label">Minute</div>
            <div className="result-value">{formatCurrency(results.minute)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;