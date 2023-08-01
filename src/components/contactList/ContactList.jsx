import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <ul>
      {filteredContacts.map(contact => {
        return (
          <li key={contact.id} className={css.contactItem}>
            {contact.name}:&nbsp;<span>{contact.number}</span>
            <button
              className={css.deleteButton}
              type="button"
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};
