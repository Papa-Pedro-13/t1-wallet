import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CFOOperationsDetails.module.css';
import 'dayjs/locale/de';
import { useNavigate, useParams } from 'react-router';
import { TransferForm } from '../../moneyTransfer';
import ChangeBudget from './ChangeBudget';
import { useGetCFOQuery } from '../model/cfoApiSlice';
import { TransferFromCFO } from '../../moneyTransfer/model/types';
import { Button } from '../../../shared/ui';
import { TransferCoinsFromCFO } from '../../../shared/api/transferApi/transferApi';
import { changeBudget } from '../../../shared/api/cfoApi/changeCFOBudget';
import TransactionsTable from '../../transactions/ui/TransactionsTable';
import { useAppSelector } from '../../../app/store/store';
import { UserRole } from '../../user/model/types/user';

const CFOOperationsDetails = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading, refetch } = useGetCFOQuery({
    id: +id,
  });
  const { currentUser } = useAppSelector((state) => state.user);
  const [newBudget, setNewBudget] = useState(0);
  const [form, setForm] = useState<TransferFromCFO>({
    amount: 0,
    userId: 0,
    comment: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) return;
    navigate('/');
  }, [id, navigate]);

  useEffect(() => {
    //trash
    if (data) {
      setNewBudget(data.budget);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      {data === undefined && isLoading === false ? (
        <>
          <h2 className={styles.mainHeadline}>ЦФО не найдено</h2>
          <Link to={'/'}>
            <Button text='Вернуться на главную' />
          </Link>
        </>
      ) : (
        <>
          <h2 className={styles.mainHeadline}>{data?.title}</h2>
          {currentUser?.userRole === UserRole.admin && (
            <ChangeBudget
              onSubmit={async () => {
                await changeBudget(newBudget, data);
                refetch();
              }}
              disabled={newBudget === data?.budget}
              value={newBudget}
              onChange={(value) => setNewBudget(value)}
            />
          )}

          {/* Need */}
          {/* {user.currentUser?.id === '1' && ( */}
          <TransferForm
            form={form}
            setForm={setForm}
            headline='Перевести пользователю из ЦФО'
            max={data?.budget}
            onSubmit={(e) => {
              if (id) {
                TransferCoinsFromCFO(e, id, form);
              }
            }}
          />
          {/* )} */}
          <TransactionsTable />
        </>
      )}
    </div>
  );
};

export default CFOOperationsDetails;
