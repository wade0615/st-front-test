import { useNavigate } from 'react-router-dom';
import 'pages/noAccess/NoAccessStyle.scss';

const NonAccess = () => {
  const navigate = useNavigate();
  return (
    <div className='Wrapper'>
      <div className='Text'>哎呀，您目前沒有權限唷！</div>
      <button type='button' onClick={() => navigate(-1)}>
        回上一頁
      </button>
    </div>
  );
};

export default NonAccess;
