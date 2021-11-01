import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './Loader.module.css';

const ApplyLoader = ({ type = 'Puff' }) => {
  const options = {
    type,
    color: 'cornflowerblue',
    height: 88,
    width: 88,
  };
  return (
    <div className={css.container}>
      <Loader {...options} />
    </div>
  );
};

export default ApplyLoader;
