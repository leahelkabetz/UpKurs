import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearMessage } from '../redux/slices/messageSlice';

const GlobalToast = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message.text) return null;

  return (
    <div
      className="toast show position-fixed top-50 start-50 translate-middle"
      style={{ zIndex: 2000, minWidth: 300, direction: 'rtl' }}
    >
      <div
        className={`toast-header text-white w-100 justify-content-center ${
          message.type === 'error' ? 'bg-danger' : 'bg-success'
        }`}
      >
        <strong className="w-100 text-center">{message.text}</strong>
      </div>
    </div>
  );
};

export default GlobalToast;
