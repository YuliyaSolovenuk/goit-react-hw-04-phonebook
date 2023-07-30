import PropTypes from 'prop-types';
// import { Component } from 'react';
import css from './Form.module.css';
import { useState } from 'react';

export function Form({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }
    const handleSubmit = evt => {
      evt.preventDefault();

      onFormSubmit(name, number);

      reset();
      evt.target.reset();
    };

    const reset = () => {
      setName('');
      setNumber('');
    };

    const isFormEmpty = !name || !number;
    return (
      <div>
        <form onSubmit={handleSubmit} className={css.formCover}>
          <label className={css.formLabel}>
            Name
            <input
              className={css.formInput}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              onChange={handleChange}
              required
            />
          </label>
          <label className={css.formLabel}>
            Number
            <input
              className={css.formInput}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              onChange={handleChange}
              required
            />
          </label>
          <button className={css.formBtn} type="submit" disabled={isFormEmpty}>
            Add contact
          </button>
        </form>
      </div>
    );
  };

// export class Form extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();

//     this.props.onFormSubmit(this.state);

//     this.reset();
//     evt.target.reset();
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     const isFormEmpty = !name || !number;
//     return (
//       <div >
//         <form onSubmit={this.handleSubmit} className={css.formCover}>
//           <label className={css.formLabel}>
//             Name
//             <input className={css.formInput}
//               type="text"
//               name="name"
//               pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               onChange={this.handleChange}
//               required
//             /></label>
//             <label className={css.formLabel}>
//             Number
//             <input className={css.formInput}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               onChange={this.handleChange}
//               required
//             />
//           </label>
//             <button className={css.formBtn} type="submit" disabled={isFormEmpty}>
//               Add contact
//             </button>
//         </form>
//       </div>
//     );
//   }
// }

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
