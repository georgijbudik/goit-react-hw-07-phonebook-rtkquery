import { nanoid } from 'nanoid';
import { Form, Container, Label, Input, Button } from './ContactForm.styled';
import { useState } from 'react';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'components/redux/contactApi';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const nameInputId = nanoid();
  const telInputId = nanoid();

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
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    try {
      await addContact({ name, number });
    } catch (error) {
      alert('Could not add the contact');
      return;
    }

    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Label htmlFor={nameInputId}>Name</Label>
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          id={nameInputId}
        />
        <Label htmlFor={telInputId}>Number</Label>
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          id={telInputId}
        />
      </Container>

      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
