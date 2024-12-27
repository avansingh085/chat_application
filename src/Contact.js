import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddContact } from './globalSlice';
import CreatGroup from './CreatGroup';
import ContactBox from './ContactBox';

function Contact() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ user: '', mobile: [] });
  const [searchContact, setSearchContact] = useState('');
  const contacts = useSelector((state) => state.Chat.addContact) || [];
  const [showGroupForm,setShowGroupForm]=useState(0);
  const Mobile = useSelector((state) => state.Chat.Mobile);
  const dispatch = useDispatch();

  const handleAddOrUpdateContact = async () => {
    if (!newContact.user.trim() || !newContact.mobile.trim()) return;

    try {
      const res = await fetch('http://localhost:3001/addContact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({isGroup:showGroupForm, receiver: newContact.mobile, user: newContact.user, user: Mobile }),
      });
      const res1 = await res.json();
      if (res1.success) {
        dispatch(setAddContact(newContact)); 
        setNewContact({ user: '', mobile: '' }); 
        setShowAddForm(false); 
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
     
      <div className="bg-white p-4 shadow flex justify-between items-center">
      <button
          className="text-white bg-green-500 px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition" 
           onClick={()=>setShowGroupForm((prev)=>!prev)}
>    {showGroupForm ? "Cancel": "Creat Group"}</button>
        <button className="text-white bg-green-500 px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition">Select -Lang</button>
        <button
          className="text-white bg-green-500 px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition"
          onClick={() => setShowAddForm((prev) => !prev)} 
        >
          {showAddForm ? 'Cancel' : 'Add Contact'}
        </button>
      </div>

       {
        showGroupForm ? <CreatGroup setShowGroup={setShowGroupForm}/> :null
       }
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
            onChange={(e) => setNewContact({ ...newContact, mobile:[ e.target.value ]})}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleAddOrUpdateContact} 
          >
            Save Contact
          </button>
        </div>
      )}

    
      <div className="p-4">
        <input
          type="text"
          className="w-full p-3 text-sm border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
          placeholder="Search Contacts..."
          value={searchContact}
          onChange={(e) => setSearchContact(e.target.value)}
        />
      </div>

      
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
