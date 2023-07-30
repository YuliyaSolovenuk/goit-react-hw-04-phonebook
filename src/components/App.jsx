import Notiflix from 'notiflix';
//import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './form/Form';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { useState, useEffect } from 'react';

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  cssAnimationStyle: 'zoom',
});


export function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    console.log(e.target);
    const { value } = e.target;
    setFilter(value);
  };

  const formSubmitHandler = (name, number) => {
    const isIncludeName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const isIncludeNumber = contacts.find(contact => contact.number === number);

    if (isIncludeName) {
      Notiflix.Notify.warning(`${name} is already in contacts`);
      return;
    }

    if (isIncludeNumber) {
      Notiflix.Notify.warning(`${number} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const onFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <h2>Phonebook</h2>
      <Form onFormSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        filteredContacts={onFiltredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contactsStorage = JSON.parse(localStorage.getItem('contacts'));
//     if (contactsStorage) {
//       this.setState({ contacts: contactsStorage });
//     }
//   }

//   componentDidUpdate(_, prevState) {

//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   formSubmitHandler = (name, number) => {
//     const isIncludeName = this.state.contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     const isIncludeNumber = this.state.contacts.find(
//       contact => contact.number === number
//     );

//     if (isIncludeName) {
//       Notiflix.Notify.warning(`${name} is already in contacts`);
//       return;
//     }

//     if (isIncludeNumber) {
//       Notiflix.Notify.warning(`${number} is already in contacts`);
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name: name.trim(),
//       number: number.trim(),
//     };

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };

//   onFiltredContacts = () => {
//     const { contacts, filter } = this.state;
//     return contacts.filter(contact => {
//       return contact.name.toLowerCase().includes(filter.toLowerCase());
//     });
//   };

//   deleteContact = id => {
//     this.setState(prevState => {
//       const updatedContacts = prevState.contacts.filter(
//         contact => contact.id !== id
//       );
//       return { contacts: updatedContacts };
//     });
//   };

//   render() {
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 24,
//           color: '#010101',
//         }}
//       >
//         <h2>Phonebook</h2>
//         <Form onFormSubmit={this.formSubmitHandler} />
//         <h2>Contacts</h2>
//         <Filter filter={this.state.filter} handleChange={this.handleChange} />
//         <ContactList
//           filteredContacts={this.onFiltredContacts()}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
