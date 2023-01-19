import { List, Item, Button } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import PropTypes from 'prop-types';
import { selectContacts, selectFilter } from 'redux/selectors';




  export default function ContactList() {
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectFilter);
  
    const contactsFiltered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const dispatch = useDispatch();

  if (contactsFiltered) {
  return (
    <List>
      {contactsFiltered.map(({ id, name, number }) => {
        return (
          <Item key={id}>
            {name}: {number}
            <Button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </Button>
          </Item>
        );
      })}
    </List>
  );
};
}

List.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
};