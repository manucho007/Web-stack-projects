import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';

export default class ContactsList extends LitElement {
  constructor() {
    super();
    this.displayAllContacts = this.displayAllContacts.bind(this);
  }
  static get properties() {
    return {
      allContacts: Array,
      deleteContact: Function,
    };
  }

  firstUpdated() {
    console.log(this.allContacts);
  }

  deleteContact() {}
  // Hanldes the display of all the contacts passed
  displayAllContacts() {
    return this.allContacts.map((contact, index) => {
      return html`
        <div class="contact">
          <div class="user-img"></div>
          <div class="fullname">
            <span class="text">${contact.first_name} ${contact.last_name}</span>
            <span class="sub">Full Name</span>
          </div>
          <div class="number">
            <span class="text">${contact.phone_number}</span>
            <span class="sub">Phone number</span>
          </div>
          <div class="state">
            <span class="text">${contact.city}</span>
            <span class="sub">City</span>
          </div>
          <div class="category">
            <span class="text">${contact.category}</span>
            <span class="sub">Category</span>
          </div>
          <div
            class="delete-btn"
            @click="${this.deleteContact.bind(null, index)}"
          >
            Delete
          </div>
        </div>
      `;
    });
  }
  render() {
    return html`
      <style>
        @import '/css/global.css';
        .contacts {
          max-width: 800px;
        }
        h2 {
          color: #3e4162;
          font-weight: 300;
        }
        .contact {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 2fr 3fr 1fr 1fr;
          color: #3d4060;
          padding: 20px;
          border-radius: 10px;
          transition: all 0.4s ease-in-out;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .contact .user-img {
          background-image: url('https://uifaces.co/our-content/donated/NY9hnAbp.jpg');
          height: 40px;
          width: 40px;
          background-size: cover;
          background-position: center center;
          border-radius: 10px;
        }
        .contact:hover {
          -webkit-box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
          -moz-box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
          box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
        }
        .contact .fullname {
          color: #3d4060;
          font-weight: 700;
          text-transform: capitalize;
        }
        .text {
          display: block;
          text-align: center;
        }
        .number {
          font-weight: 500;
        }
        .category .fullname .user-img .state .number {
          font-size: 1.4rem;
          font-weight: 500;
        }
        .sub {
          display: block;
          color: #b4b5c4;
          font-weight: 300;
          font-size: 0.8rem;
          text-align: center;
          margin: 5px 0;
        }
        .delete-btn {
          position: absolute;
          height: 100%;
          right: 0;
          padding: 20px;
          color: white;
          background: red;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translate3d(100%, 0, 0);
          transition: all 0.4s ease-in-out;
        }
        .contact:hover .delete-btn {
          transform: translate3d(0, 0, 0);
        }
      </style>
      <section class="contacts">
        <h2>Contacts</h2>

        ${this.displayAllContacts()}
      </section>
    `;
  }
}

//   Here goes another element

customElements.define('contacts-list', ContactsList);
