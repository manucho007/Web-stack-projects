import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';
import SideMenu from './SideMenu.js';
import ContentArea from './ContentArea.js';

class CounterComp extends LitElement {
  constructor() {
    super();
    this.togglePopup = this.togglePopup.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.popupOpen = false;
    this.allContacts = [];
  }
  static get properties() {
    return {
      color: { type: String },
      popupOpen: Boolean,
      allContacts: Array,
    };
  }

  firstUpdated() {}
  togglePopup() {
    console.log('Clicked button');
    this.popupOpen = !this.popupOpen;
    console.log(this.popupOpen);
    this.requestUpdate();
  }

  saveContact(contact) {
    console.log('saved contact');
    console.log(contact);
    function immutablePush(arr, newEntry) {
      return [...arr, newEntry];
    }
    let newArray = immutablePush(this.allContacts, contact);
    this.allContacts = newArray;
    console.log('**********');
    console.log(this.allContacts);
  }

  deleteContact(contact) {
    function immutableDelete(arr, index) {
      return arr.slice(0, index).concat(arr.slice(index + 1));
    }
    const newArray = immutableDelete(this.allContacts, contact);
    this.allContacts = newArray;
    console.log(contact);
  }

  render() {
    return html`
      <style>
        @import '/css/global.css';
        .main-page {
          display: grid;
          grid-template-columns: 250px 1fr;
        }
      </style>

      <div class="main-page">
        <side-menu .togglePopup="${this.togglePopup}"></side-menu>
        <content-area
          popupOpen="${this.popupOpen}"
          .togglePopup="${this.togglePopup}"
          .saveContact="${this.saveContact}"
          .allContacts="${this.allContacts}"
          .deleteContact="${this.deleteContact}"
        ></content-area>
      </div>
    `;
  }
}

//   Here goes another element

customElements.define('app-polymer', CounterComp);
