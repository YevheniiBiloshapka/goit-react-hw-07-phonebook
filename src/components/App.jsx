import { Box, Section, Results } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operation';
import { useEffect } from 'react';
import { Spiner } from 'components/Spiner/spiner';

export default function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Section>
      <Box>
        {isLoading && <Spiner />}

        <h2>Contacts</h2>

        <Filter />

        {contacts.length === 0 ? (
          <Results>You don't have any contact 😓</Results>
        ) : (
          <ContactList contacts={contacts} />
        )}
      </Box>
      <Box>
        <h1>Phonebook</h1>
        <ContactForm />
      </Box>
      <ToastContainer limit={1} />
    </Section>
  );
}
