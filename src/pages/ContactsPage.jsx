import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const ContactsPage = () => {
  return (
    <div className="container">
      <h1 className="hero_contacts">Phonebook</h1>
      <ContactForm />

      <h2 className="contacts_list">Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
