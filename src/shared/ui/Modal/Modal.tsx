import { ReactNode, useEffect } from 'react';
import styles from './Modal.module.css';
import Button from '../Button/Button';

interface ModalProps {
  children: ReactNode;
  onCancel?: () => void;
  onAccept?: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onAccept, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div
          className={styles.close}
          onClick={onCancel}
        >
          <span></span>
          <span></span>
        </div>
        {children}
        <div className={styles.buttons}>
          <Button
            text={'Отмена'}
            onClick={onCancel}
          />
          <Button
            style='green'
            text={'Подтвердить'}
            onClick={onAccept}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
