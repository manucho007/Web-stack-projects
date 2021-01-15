import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';
import ContactsList from './ContactsList.js';
import FavoritesList from './FavoritesList.js';
import FormPopup from './FormPopup.js';

export default class ContentArea extends LitElement {
  constructor() {
    super();
  }
  static get properties() {
    return {
      color: { type: String },
      popupOpen: Boolean,
      togglePopup: Function,
      saveContact: Function,
      deleteContact: Function,
      allContacts: Array,
    };
  }

  firstUpdated() {
    console.log(this.allContacts);
  }
  render() {
    return html`
      <style>
        @import '/css/global.css';
        #content-area {
          background: #fcfdff;
          padding: 50px 80px;
        }
      </style>
      <section id="content-area">
        <form-popup
          popupOpen="${this.popupOpen}"
          .togglePopup="${this.togglePopup}"
          .saveContact="${this.saveContact}"
        ></form-popup>
        <favorites-list .allContacts="${this.allContacts}"></favorites-list>
        <contacts-list
          .allContacts="${this.allContacts}"
          .deleteContact="${this.deleteContact}"
        >
        </contacts-list>
      </section>
    `;
  }
}

//   Here goes another element

customElements.define('content-area', ContentArea);
