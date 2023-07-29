import PropTypes from 'prop-types'
 import css from './Filter.module.css';

export const Filter = ({ handleChange, filter }) => {
  return (
    <label className={css.filterLabel}>
      Find contacts by name
      <input
      className={css.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        placeholder="Search contacts"
      />
    </label>
  );
};

Filter.propTypes = {
    filter: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}