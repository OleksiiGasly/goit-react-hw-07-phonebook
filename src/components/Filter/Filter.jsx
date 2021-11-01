import PropTypes from 'prop-types';
import { Label } from './Filter.styled';

const Filter = ({ value, onChange }) => {
  return (
    <Label>
      <p> Find contact by name</p>
      <input type="text" value={value} onChange={onChange} />
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
