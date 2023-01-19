import { Label, FindInput } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter/filterSlice';
import PropTypes from 'prop-types';

export const Filter = () => {
  const dispatch = useDispatch();
  const onWrite = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <Label>
      Find contacts by name
      <FindInput
       type="text"
       name="filter" 
       onChange={onWrite} />
    </Label>
  );
};

Label.propTypes = {
  filter: PropTypes.string,
};