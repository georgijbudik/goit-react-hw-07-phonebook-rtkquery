import ContactListItem from 'components/ContactList/ContactListItem';
import { useGetContactsQuery } from 'components/redux/contactApi';
import { selectFilter } from 'components/redux/selectors';
import { useSelector } from 'react-redux';

const ContactList = () => {
  const { data: contacts, error, isLoading } = useGetContactsQuery();
  const filter = useSelector(selectFilter);
  const getFilteredContacts = () => {
    if (!contacts) return;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();
  return (
    <div>
      {isLoading && !error && <b>Request in progress...</b>}
      {error && <b>Error!</b>}
      <ul>
        {filteredContacts &&
          filteredContacts.map(({ id, name, number }) => (
            <ContactListItem
              key={id}
              id={id}
              name={name}
              number={number}
            ></ContactListItem>
          ))}
      </ul>
    </div>
  );
};

export default ContactList;
