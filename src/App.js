// Importando as bibliotecas e módulos necessários
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Configurando o idioma do Moment.js
  moment.locale('pt-br');

  // Definindo os estados iniciais
  const [numDays, setNumDays] = useState(0);
  const [numHours, setNumHours] = useState(0);
  const [startDate, setStartDate] = useState(moment());
  const [medicationSchedule, setMedicationSchedule] = useState([]);

  // Função para criar a lista de horários da medicação
  const setSchedule = (days, frequency) => {
    // Verificando se a data de início selecionada é válida
    if (!startDate.isValid()) {
      alert('Por favor, selecione uma data de início válida');
      return;
    }

    // Criando a lista de horários da medicação
    const scheduleList = [];
    let dateTime = moment(startDate);

    for (let i = 0; i < days; i++) {
      for (let j = 0; j < 24; j += frequency) {
        scheduleList.push(dateTime.clone().add(j, 'hours').format('dddd, D [de] MMMM [às] HH:mm'));
      }
      dateTime.add(1, 'day');
    }

    // Removendo o último item da lista (que pode ser desnecessário)
    scheduleList.pop()

    // Armazenando a lista de horários no estado medicationSchedule
    setMedicationSchedule(scheduleList);
 }
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
                onChange={(event) => setStartDate(moment(event.target.value, "YYYY-MM-DDTHH:mm"))}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-4">
              <button
                className="btn btn-primary"
                onClick={() => setSchedule(numDays, numHours)}
              >
                Calcular Horários
              </button>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <h3>Horários de Medicação:</h3>
              {medicationSchedule.length === 0 ? (
                <p>Nenhum horário calculado.</p>
              ) : (
                <ul className="list-group">
                  {medicationSchedule.map((scheduleItem, index) => (
                    <li className="list-group-item" key={index}>{scheduleItem}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default App;