import { Button } from './ContactListItem.styled';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'components/redux/contactApi';

const ContactListItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const formattedPhone = number.replace(/ x\d+$/, '');

  return (
    <li>
      {name}: {formattedPhone}
      <Button onClick={() => deleteContact(id)} disabled={isLoading}>
        Delete
      </Button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactListItem;
