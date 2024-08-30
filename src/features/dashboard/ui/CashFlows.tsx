import { useEffect, useState } from 'react';
import styles from './CashFlows.module.css';
import { BarChart, YAxis, Bars, LineChart, Line } from '@rsuite/charts';
import { DatePicker, Dropdown } from 'rsuite';
import isAfter from 'date-fns/isAfter';
import { getMonthReport } from '../../../shared/api/reportApi/getMonthReport';

// const serverData = [
//   { dateTime: '2024-08-30', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-08-29', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-08-28', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-08-27', userCoinsTotal: 10000, centerCoinsTotal: 80000 },
//   { dateTime: '2024-08-26', userCoinsTotal: 1000, centerCoinsTotal: 63000 },
//   { dateTime: '2024-08-25', userCoinsTotal: 20000, centerCoinsTotal: 70000 },
//   { dateTime: '2024-08-24', userCoinsTotal: 30000, centerCoinsTotal: 10000 },
//   { dateTime: '2024-08-23', userCoinsTotal: 45000, centerCoinsTotal: 100000 },
//   { dateTime: '2024-08-22', userCoinsTotal: 32000, centerCoinsTotal: 90000 },
//   { dateTime: '2024-08-21', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-20', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-08-19', userCoinsTotal: 10000, centerCoinsTotal: 80000 },
//   { dateTime: '2024-08-18', userCoinsTotal: 1000, centerCoinsTotal: 63000 },
//   { dateTime: '2024-08-17', userCoinsTotal: 20000, centerCoinsTotal: 70000 },
//   { dateTime: '2024-08-16', userCoinsTotal: 30000, centerCoinsTotal: 10000 },
//   { dateTime: '2024-08-15', userCoinsTotal: 45000, centerCoinsTotal: 100000 },
//   { dateTime: '2024-08-14', userCoinsTotal: 32000, centerCoinsTotal: 90000 },
//   { dateTime: '2024-08-13', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-12', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-11', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-10', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-09', userCoinsTotal: 10000, centerCoinsTotal: 80000 },
//   { dateTime: '2024-08-08', userCoinsTotal: 1000, centerCoinsTotal: 63000 },
//   { dateTime: '2024-08-07', userCoinsTotal: 20000, centerCoinsTotal: 70000 },
//   { dateTime: '2024-08-06', userCoinsTotal: 30000, centerCoinsTotal: 10000 },
//   { dateTime: '2024-08-05', userCoinsTotal: 45000, centerCoinsTotal: 100000 },
//   { dateTime: '2024-08-04', userCoinsTotal: 32000, centerCoinsTotal: 90000 },
//   { dateTime: '2024-08-03', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-02', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-01', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-08-00', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-07-30', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-07-29', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-07-28', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-07-27', userCoinsTotal: 10000, centerCoinsTotal: 80000 },
//   { dateTime: '2024-07-26', userCoinsTotal: 1000, centerCoinsTotal: 63000 },
//   { dateTime: '2024-07-25', userCoinsTotal: 20000, centerCoinsTotal: 70000 },
//   { dateTime: '2024-07-24', userCoinsTotal: 30000, centerCoinsTotal: 10000 },
//   { dateTime: '2024-07-23', userCoinsTotal: 45000, centerCoinsTotal: 100000 },
//   { dateTime: '2024-07-22', userCoinsTotal: 32000, centerCoinsTotal: 90000 },
//   { dateTime: '2024-07-21', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-07-20', userCoinsTotal: 10000, centerCoinsTotal: 20000 },
//   { dateTime: '2024-07-19', userCoinsTotal: 10000, centerCoinsTotal: 80000 },
//   { dateTime: '2024-07-18', userCoinsTotal: 1000, centerCoinsTotal: 63000 },
//   { dateTime: '2024-07-17', userCoinsTotal: 2000, centerCoinsTotal: 7000 },
//   { dateTime: '2024-07-16', userCoinsTotal: 3000, centerCoinsTotal: 1000 },
//   { dateTime: '2024-07-15', userCoinsTotal: 45000, centerCoinsTotal: 10000 },
//   { dateTime: '2024-07-14', userCoinsTotal: 32000, centerCoinsTotal: 9000 },
//   { dateTime: '2024-07-13', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-07-12', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-07-11', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-07-10', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-07-09', userCoinsTotal: 1000, centerCoinsTotal: 8000 },
//   { dateTime: '2024-07-08', userCoinsTotal: 1000, centerCoinsTotal: 63000 },
//   { dateTime: '2024-07-07', userCoinsTotal: 2000, centerCoinsTotal: 7000 },
//   { dateTime: '2024-07-06', userCoinsTotal: 3000, centerCoinsTotal: 1000 },
//   { dateTime: '2024-07-05', userCoinsTotal: 4500, centerCoinsTotal: 10000 },
//   { dateTime: '2024-07-04', userCoinsTotal: 3200, centerCoinsTotal: 9000 },
//   { dateTime: '2024-07-03', userCoinsTotal: 1900, centerCoinsTotal: 2300 },
//   { dateTime: '2024-07-02', userCoinsTotal: 1900, centerCoinsTotal: 2300 },
//   { dateTime: '2024-07-01', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
//   { dateTime: '2024-07-00', userCoinsTotal: 19000, centerCoinsTotal: 23000 },
// ];

type BarType = [string, number, number, number];
type BarArray = BarType[];

const CashFlows = () => {
  const [isCoinsNominal, setIsCoinsNominal] = useState(true);
  const [month, setMonth] = useState<Date | null>(new Date());
  const [data, setData] = useState<BarArray>([]);

  useEffect(() => {
    if (month !== undefined && month !== null) {
      getMonthReport(month.getFullYear(), month.getMonth() + 1).then(
        (serverData) =>
          setData(
            serverData
              .sort((a, b) =>
                new Date(a.dateTime) > new Date(b.dateTime) ? 1 : -1
              )
              .map((day) => [
                day.dateTime,
                day.centerCoinsTotal * (isCoinsNominal ? 1 : 10),
                day.userCoinsTotal * (isCoinsNominal ? 1 : 10),
                (day.centerCoinsTotal + day.userCoinsTotal) *
                  (isCoinsNominal ? 1 : 10),
              ])
          )
      );
    }
  }, [isCoinsNominal, month]);

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <div className={styles.filters}>
          <Dropdown
            title='Валюта номинала'
            onSelect={(e) => setIsCoinsNominal(e === 'Coins')}
          >
            <Dropdown.Item eventKey='Coins'>Коины</Dropdown.Item>
            <Dropdown.Item eventKey='Rubles'>Рубли</Dropdown.Item>
          </Dropdown>
          <DatePicker
            oneTap
            value={month}
            onChange={(date) => setMonth(date)}
            shouldDisableDate={(date) => isAfter(date, new Date())}
            placeholder={'Выберите месяц для отчета'}
            format='yyyy-MM'
          />
        </div>
        <BarChart
          data={data}
          className={styles.chart}
        >
          <YAxis
            axisLabel={(value: number) => `${value / 1000}K`}
            minInterval={1000}
            splitLine={false}
          />
          <Bars name='Коины пользователей' />
          <Bars name='Коины ЦФО' />
          <Bars name='Все коины' />
        </BarChart>
        <LineChart data={data}>
          <YAxis
            // name='指标1'
            minInterval={1000}
          />

          <Line
            name='Коины пользователей'
            yAxisIndex={0}
          />
          <Line
            name='Коины ЦФО'
            yAxisIndex={0}
          />
          <Line
            name='Все коины'
            yAxisIndex={0}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default CashFlows;
