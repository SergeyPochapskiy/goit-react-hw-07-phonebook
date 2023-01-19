import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import  ContactsList  from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import { Wrap } from './App.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';



export default function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  return (
    <Wrap>
      <Section title={`Phonebook`}></Section>
      <ContactForm />
      <Section title={`Contacts`}>
        <Filter />
        {isLoading && !error && <b>Loading...</b>}
        <ContactsList />
      </Section>
    </Wrap>
  );
}
