
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/contacts/operations';

import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormContact,
  Label,
  Input,
  Button,
  ErrorText,
} from './ContactForm.styled.jsx';


const nameValidate =
  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phoneValidate = RegExp(
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{1,3}\\)[ \\-]*)|([0-9]{1,4})[ \\-]*)*?[0-9]{1,4}?[ \\-]*[0-9]{1,9}?$/
);

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(16)
    .matches(
      nameValidate,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .required()
    .min(6)
    .max(10)
    .matches(
      phoneValidate,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {

  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    )
      ? alert(`${values.name} is already in contacts`)
      : dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormContact autoComplete="off">
        <Label>
          Name
          <Input type="text" name="name"></Input>
          <ErrorText component="div" name="name" />
        </Label>
        <Label>
          Number
          <Input type="tel" name="number"></Input>
          <ErrorText component="div" name="number" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormContact>
    </Formik>
  );
};