async function fetchContacts() {
    const response = await fetch('http://localhost:3000/contacts');
    const data = await response.json();
    const contactsDiv = document.getElementById('contacts');
    contactsDiv.innerHTML = '';
    data.forEach(contact => {
      const contactDiv = document.createElement('div');
      contactDiv.classList.add('contact');
      contactDiv.innerHTML = `
        <p>Name: ${contact.name}</p>
        <p>Surname: ${contact.surname}</p>
        <p>Phone: ${contact.phone}</p>
        <p>Email: ${contact.email}</p>
        <button class="deleteButton" data-id="${contact.id}">Delete</button>
      `;
      contactsDiv.appendChild(contactDiv);
    });
  }

  async function addContact() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    await fetch('http://localhost:3000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, surname, phone, email })
    });

    fetchContacts();
  }

  async function deleteContact(id) {
    await fetch(`http://localhost:3000/contacts/${id}`, {
      method: 'DELETE'
    });

    fetchContacts();
  }

  document.getElementById('addButton').addEventListener('click', addContact);

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteButton')) {
      const id = event.target.dataset.id;
      deleteContact(id);
    }
  });

  document.addEventListener('DOMContentLoaded', fetchContacts);