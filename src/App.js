import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  moment.locale('pt-br');

  const [numDays, setNumDays] = useState(0);
  const [numHours, setNumHours] = useState(0);
  const [startDate, setStartDate] = useState(moment());
  const [medicationSchedule, setMedicationSchedule] = useState([]);

  const setSchedule = (days, frequency) => {
    if (!startDate.isValid()) {
      alert('Por favor, selecione uma data de início válida');
      return;
    }

    const scheduleList = [];
    let dateTime = moment(startDate);

    for (let i = 1; i <= days; i++) {
      const iterations = Math.floor(24 / frequency);
      for (let j = 0; j < iterations; j++) {
        scheduleList.push(dateTime.clone().add(j * frequency, 'hours').format('dddd, D [de] MMMM [às] HH:mm'));
      }
      dateTime.add(1, 'day');
    }

    const scheduleByDay = scheduleList.reduce((acc, dateTimeStr) => {
      const dateStr = moment(dateTimeStr, 'dddd, D [de] MMMM [às] HH:mm').format('D [de] MMMM');
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(dateTimeStr);
      return acc;
    }, {});

    const scheduleArray = Object.values(scheduleByDay);
    scheduleArray.pop();
    setMedicationSchedule(scheduleArray);
  };

  return (
    <div className="container mt-5">
      <div className="card p-5">
        <h1 className="mb-4">Calculadora de Horários de Medicamentos</h1>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Quantidade de dias:</label>
          <div className="col-sm-2">
            <input
              className="form-control"
              type="number"
              value={numDays}
              onChange={(event) => setNumDays(event.target.value)}
              min="0"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">De quantas em quantas horas:</label>
          <div className="col-sm-2">
            <input
              className="form-control"
              type="number"
              value={numHours}
              onChange={(event) => setNumHours(event.target.value)}
              min="0"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Data de início:</label>
          <div className="col-sm-4">
            <input
              className="form-control"
              type="datetime-local"
              value={startDate.format('YYYY-MM-DDTHH:mm')}
              onChange={(event) => setStartDate(moment(event.target.value))}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <button className="btn btn-primary" onClick={() => setSchedule(numDays, numHours)}>Gerar Horários</button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            {medicationSchedule.length > 0 ? (
              <div>
                <h3>Horários de Medicamentos:</h3>
                {medicationSchedule.map((daySchedule, index) => (
                  <div key={index}>
                    <h4>Dia {index + 1}</h4>
                    <ul>
                      {daySchedule.map((time) => (
                        <li key={time}>{time}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
