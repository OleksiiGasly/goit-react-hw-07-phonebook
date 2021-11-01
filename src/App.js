import { useFetchContactsQuery, useDeleteContactMutation } from './redux/slice';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Form from './components/Form/Form';
import List from './components/List/List';
import Filter from './components/Filter/Filter';
import { FirstTitle, SecondTitle } from './App.styled';
import ApplyLoader from './components/Loader/Loader';
// import toast from 'react-hot-toast';

const App = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const [filter, setFilter] = useState('');
  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div>
      <FirstTitle>Phonebook</FirstTitle>
      <Form />
      <SecondTitle>Contacts</SecondTitle>
      <Filter value={filter} onChange={changeFilter} />
      {isFetching && ApplyLoader}
      {contacts && (
        <List
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
          deleting={isDeleting}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
