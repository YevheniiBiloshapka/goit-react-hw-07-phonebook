import {
  Button,
  InputNumber,
  InputName,
  Label,
  FormBox,
  Error,
} from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContacts } from 'redux/operation';
import { useState } from 'react';

export const ContactForm = () => {
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = ({ name }, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    dispatch(addContacts(newContact));
    setNumber('');
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormBox action="">
        <Label htmlFor="name">
          <p>Name</p>
          <InputName
            name="name"
            type="text"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            placeholder="Enter name"
          />
          <ErrorMessage name="name">
            {() => <Error>Name must be at least 4 characters</Error>}
          </ErrorMessage>
        </Label>

        <Label htmlFor="number">
          <p>Number</p>
          <InputNumber
            type="tel"
            name="number"
            country="US"
            value={number}
            onChange={setNumber}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            maxLength="16"
            placeholder="_ (___) ___-____"
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormBox>
    </Formik>
  );
};

let schema = Yup.object().shape({
  name: Yup.string().min(4).max(32).required(),
});
const initialValues = {
  name: '',
  number: '',
};
