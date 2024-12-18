import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddContact } from './globalSlice';
import ContactBox from './ContactBox';

function Contact() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ user: '', mobile: '' });
  const [searchContact, setSearchContact] = useState('');
  const contacts = useSelector((state) => state.Chat.addContact) || [];
  const Mobile = useSelector((state) => state.Chat.Mobile);
  const dispatch = useDispatch();

  const handleAddOrUpdateContact = async () => {
    if (!newContact.user.trim() || !newContact.mobile.trim()) return;

    try {
      const res = await fetch('https://chat-backend-9s3n.onrender.com/addContact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: newContact.mobile, user: newContact.user, client: Mobile }),
      });
      const res1 = await res.json();
      if (res1.success) {
        dispatch(setAddContact(newContact)); 
        setNewContact({ user: '', mobile: '' }); // Reset form fields
        setShowAddForm(false); // Hide the form
      } else {
        console.error('Error:', res1.result);
      }
    } catch (err) {
      console.error('Error while adding contact:', err);
    }
    setShowAddForm(false);
  };

  return (
    <div className="h-screen w-full md:w-3/12 bg-gray-50 border-r flex flex-col">
      {/* Header Section */}
      <div className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Contacts</h1>
        <button
          className="text-white bg-green-500 px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition"
          onClick={() => setShowAddForm((prev) => !prev)} // Toggle form visibility
        >
          {showAddForm ? 'Cancel' : 'Add Contact'}
        </button>
      </div>

      {/* Add Contact Form */}
      {showAddForm && (
        <div className="bg-white p-4 shadow mt-2">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            value={newContact.user}
            onChange={(e) => setNewContact({ ...newContact, user: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mobile"
            className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            value={newContact.mobile}
            onChange={(e) => setNewContact({ ...newContact, mobile: e.target.value })}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleAddOrUpdateContact} // Handle contact add/update
          >
            Save Contact
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          className="w-full p-3 text-sm border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
          placeholder="Search Contacts..."
          value={searchContact}
          onChange={(e) => setSearchContact(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto thin-scrollbar">
        {contacts.length > 0 ? (
          contacts
            .filter((contact) =>
              contact.user.toLowerCase().includes(searchContact.toLowerCase())
            )
            .map((contact, index) => (
              <ContactBox
                data={contact}
                key={index}
                className="p-4 hover:bg-gray-100 transition"
              />
            ))
        ) : (
          <p className="text-gray-500 text-center p-6">No contacts found</p>
        )}
      </div>
    </div>
  );
}

export default Contact;
