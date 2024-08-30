import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CFOOperationsDetails.module.css';
import 'dayjs/locale/de';
import { useNavigate, useParams } from 'react-router';
import { TransferForm } from '../../moneyTransfer';
import ChangeBudget from './ChangeBudget';
import { useGetCFOListApiQuery, useGetCFOQuery } from '../model/cfoApiSlice';
import { TransferFromCFO } from '../../moneyTransfer/model/types';
import { Button } from '../../../shared/ui';
import { TransferCoinsFromCFO } from '../../../shared/api/transferApi/transferApi';
import { changeBudget } from '../../../shared/api/cfoApi/changeCFOBudget';
import TransactionsTable from '../../transactions/ui/TransactionsTable';
import { useAppSelector } from '../../../app/store/store';
import { UserRole } from '../../user/model/types/user';
import { useGetTransactionsQuery } from '../../transactions/model/transactionsApiSlice';

const initialForm = {
  amount: 0,
  userId: 0,
  comment: '',
};

const CFOOperationsDetails = () => {
  const { id } = useParams() as { id: string };
  const cfoList = useGetCFOListApiQuery();
  const { data, isLoading, refetch } = useGetCFOQuery({
    id: +id,
  });
  const transactionsListQuery = useGetTransactionsQuery({ id: +id });
  const { currentUser, usersList } = useAppSelector((state) => state.user);
  const [newBudget, setNewBudget] = useState(0);
  const [transferFormToCFO, setTransferFormToCFO] = useState<TransferFromCFO>({
    ...initialForm,
    senderType: 'CENTER',
  });
  const [transferFormToUser, setTransferFormToUser] = useState<TransferFromCFO>(
    {
      ...initialForm,
      senderType: 'USER',
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (id) return;
    navigate('/');
  }, [id, navigate]);

  useEffect(() => {
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
        data &&
        cfoList.data && (
          <>
            <h2 className={styles.mainHeadline}>{data?.title}</h2>
            {currentUser?.userRole === UserRole.admin && (
              <ChangeBudget
                onSubmit={async () => {
                  await changeBudget(newBudget, data);
                  refetch();
                  transactionsListQuery.refetch();
                }}
                counterColor={
                  newBudget === data.budget
                    ? 'black'
                    : newBudget > data.budget
                    ? 'green'
                    : 'red'
                }
                disabled={newBudget === data?.budget}
                value={newBudget}
                onChange={(value) => setNewBudget(value)}
              />
            )}

            <TransferForm<TransferFromCFO>
              form={transferFormToUser}
              setForm={setTransferFormToUser}
              headline='Перевести пользователю из ЦФО'
              max={data?.budget}
              onSubmit={async (e) => {
                if (id) {
                  await TransferCoinsFromCFO(e, id, transferFormToUser);
                  refetch();
                  transactionsListQuery.refetch();
                }
              }}
              recipientsList={usersList.filter(
                (item) => item.id !== currentUser?.id
              )}
            />
            <TransferForm<TransferFromCFO>
              form={transferFormToCFO}
              setForm={setTransferFormToCFO}
              headline='Перевести другому ЦФО'
              max={data?.budget}
              recipientsList={cfoList.data.filter(
                (item) => item.id !== data.id
              )}
              onSubmit={async (e) => {
                if (id) {
                  await TransferCoinsFromCFO(e, id, transferFormToCFO);
                  refetch();
                  transactionsListQuery.refetch();
                }
              }}
            />

            <TransactionsTable />
          </>
        )
      )}
    </div>
  );
};

export default CFOOperationsDetails;
