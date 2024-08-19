import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui';

const NotFound = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/');
  };
  return (
    <div>
      <h1>Страница не найдена</h1>
      <Button
        text='На главную'
        onClick={onClickHandler}
      />
    </div>
  );
};

export default NotFound;
