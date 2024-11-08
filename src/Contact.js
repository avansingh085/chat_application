import { useEffect, useState } from 'react';
import ContactBox from './ContactBox';
function Contact() {
    const [contactName, setContactName] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // Controls form visibility
    const [newContact, setNewContact] = useState({ name: '', mobile: '' });
    const [searchContact, setSearchContact] = useState("");
    const [filteredContacts,setfilteredContacts]=useState()
   
    const handleAddContact = () => {
        setContactName([...contactName, newContact]);
        setNewContact({ name: '', mobile: '' });
        setShowAddForm(false); // Hide the form after adding the contact
    };
    return (
        <div className="h-screen w-3/12  mx-auto p-6 bg-gray-100 flex flex-col items-center justify-start">
            <div className="w-full flex justify-center items-center gap-2 mb-4">
                <input 
                    type="text" 
                    className="h-10 w-2/3 p-3 text-sm text-gray-700 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search Contacts..."
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                />
                <button 
                    className="h-10 w-1/3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 focus:outline-none"
                    onClick={() => setShowAddForm(!showAddForm)} // Toggle form visibility
                >
                    {showAddForm ? 'Cancel' : 'Add Contact'}
                </button>
            </div>

            {showAddForm && (
                <div className="w-full mb-4 p-4 bg-white rounded-lg shadow-lg">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                    <input 
                        type="text" 
                        placeholder="Mobile" 
                        className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={newContact.mobile}
                        onChange={(e) => setNewContact({ ...newContact, mobile: e.target.value })}
                    />
                    <button 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        onClick={handleAddContact}
                    >
                        Save Contact
                    </button>
                </div>
            )}

            <div className="w-full max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg p-4 thin-scrollbar">
                {contactName.length > 0 ? (
                    contactName.map((data, key) => (
                        <ContactBox data={data} key={key} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No contacts found</p>
                )}
            </div>
        </div>
    );
}

export default Contact;
