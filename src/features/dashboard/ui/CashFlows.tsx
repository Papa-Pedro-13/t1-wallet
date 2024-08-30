import { useEffect, useState } from 'react';
import styles from './CashFlows.module.css';
import { YAxis, PieChart, LineChart, Line } from '@rsuite/charts';
import { DatePicker, Dropdown } from 'rsuite';
import isAfter from 'date-fns/isAfter';
import {
  getMonthReport,
  updateCurrentReport,
} from '../../../shared/api/reportApi/getMonthReport';

type BarType = [string, number, number, number];
type BarArray = BarType[];
type PieType = [string, number];
type PieArray = PieType[];

const CashFlows = () => {
  const [isCoinsNominal, setIsCoinsNominal] = useState(true);
  const [month, setMonth] = useState<Date | null>(new Date());
  const [data, setData] = useState<BarArray>([]);
  const [todayCash, setTodayCash] = useState<PieArray>([]);

  useEffect(() => {
    //Обновляем
    updateCurrentReport().finally(() => {
      //Получаем актуальное
      getMonthReport(new Date().getFullYear(), new Date().getMonth() + 1).then(
        (currentMonthReport) => {
          const todayReport = currentMonthReport.pop();

          if (todayReport === undefined) return;

          const actualTodayCash: PieArray = [
            ['Коины пользователей', todayReport.usersCoinsTotal],
            ['Коины ЦФО', todayReport.centersCoinsTotal],
          ];

          setTodayCash(actualTodayCash);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (month !== undefined && month !== null) {
      getMonthReport(month.getFullYear(), month.getMonth() + 1).then(
        (serverData) => {
          setData(
            serverData
              // .sort((a, b) =>
              //   new Date(a.dateTime) > new Date(b.dateTime) ? 1 : -1
              // )
              .map((day) => [
                day.dateTime,
                day.usersCoinsTotal * (isCoinsNominal ? 1 : 10),
                day.centersCoinsTotal * (isCoinsNominal ? 1 : 10),
                (day.centersCoinsTotal + day.usersCoinsTotal) *
                  (isCoinsNominal ? 1 : 10),
              ])
          );
        }
      );
    }
  }, [isCoinsNominal, month]);

  return (
    <div className={styles.container}>
      <div className={styles.charts}>
        <div className={styles.chart}>
          <div className={styles.filters}>
            <h3 className={styles.headline}>Отчет за месяц:</h3>
            <DatePicker
              oneTap
              value={month}
              onChange={(date) => setMonth(date)}
              shouldDisableDate={(date) => isAfter(date, new Date())}
              placeholder={'Выберите месяц для отчета'}
              format='yyyy-MM'
            />
            <Dropdown
              title='Валюта номинала'
              onSelect={(e) => setIsCoinsNominal(e === 'Coins')}
            >
              <Dropdown.Item eventKey='Coins'>Коины</Dropdown.Item>
              <Dropdown.Item eventKey='Rubles'>Рубли</Dropdown.Item>
            </Dropdown>
          </div>
          {/* <BarChart
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
        </BarChart> */}
          <LineChart data={data}>
            <YAxis minInterval={1000} />
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
        <div className={styles.chart}>
          <div className={styles.filters}>
            <h3 className={styles.headline}>Отчет за сегодня</h3>
          </div>
          <PieChart
            data={todayCash}
            legend={false}
            startAngle={210}
          />
        </div>
      </div>
    </div>
  );
};

export default CashFlows;
