import PropTypes from 'prop-types'
import { Component } from 'react';
import css from './Form.module.css'

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.onFormSubmit(this.state);

    this.reset();
    evt.target.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const isFormEmpty = !name || !number;
    return (
      <div >
        <form onSubmit={this.handleSubmit} className={css.formCover}>
          <label className={css.formLabel}>
            Name
            <input className={css.formInput}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              onChange={this.handleChange}
              required
            /></label>
            <label className={css.formLabel}>
            Number
            <input className={css.formInput}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              onChange={this.handleChange}
              required
            />
          </label>
            <button className={css.formBtn} type="submit" disabled={isFormEmpty}>
              Add contact
            </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}