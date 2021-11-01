import { useState } from 'react';
import { Form, Label, Input, Button } from './Form.styled';
import {
  useFetchContactsQuery,
  useCreateContactMutation,
} from '../../redux/slice';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [addContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleContact = e => {
    const { name, value } = e.currentTarget;
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

  const handleSubmit = e => {
    e.preventDefault();
    const contactToCheck = contacts.some(contact => contact.name === name);
    if (contactToCheck) {
      toast(`${name} is already in contacts`);
      setName('');
      setNumber('');
      return;
    }
    addContact({ name, number });
    toast(`${name} is added to contacts`);
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">
        Name
        <Input
          value={name}
          onChange={handleContact}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов.
             Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </Label>
      <Label htmlFor="number">
        Number
        <Input
          value={number}
          onChange={handleContact}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять из цифр и может содержать пробелы,
             тире, круглые скобки и может начинаться с +"
          required
        />
      </Label>
      <div>
        <Button type="submit" disabled={isLoading}>
          Add contact
        </Button>
      </div>
    </Form>
  );
};

export default ContactForm;
