import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';
import ContactsList from './ContactsList.js';
import FavoritesList from './FavoritesList.js';

export default class FormPopup extends LitElement {
  constructor() {
    super();
    this.formData = {};
    this.change = this.change.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.newValue = '';
  }
  static get properties() {
    return {
      popupOpen: Boolean,
      formData: Object,
    };
  }

  //   Replacement for _firstRendered()
  firstUpdated() {}
  updated() {
    this.popupOpen ? (this.newValue = 'active') : (this.newValue = ' ');
    console.log(this.newValue);
    console.log(this.popupOpen);
  }

  //   Not damn working
  closeDamnScreen() {
    this.newValue = '';
    console.log('CLick');
  }

  //   Handle the submissions in the form

  submitForm(event) {
    event.preventDefault();
    this.saveContact(this.formData);
    this.formData = {};
  }

  //   Handle changes in the form
  change(event) {
    let formData = {};
    let name = event.target.name;
    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    formData[name] = value;
    this.formData = Object.assign(this.formData, formData);
    console.log(this.formData);
  }

  render() {
    return html`
      <style>
        @import '/css/global.css';
        .form-popup {
          background: #2b304c;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          visibility: hidden;
          transition: all 0.4s ease-in-out;
        }
        .form-popup.active {
          visibility: visible;
        }
        form {
          background: white;
          padding: 20px;
          width: 400px;
          border-radius: 10px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 20px;
        }
        h2 {
          font-size: 1.4rem;
          font-weight: 500;
          grid-column: 1/5;
        }
        label {
          background: white;
          font-size: 0.7rem;
          position: absolute;
          top: -5px;
          display: inline-block;
        }
        .form-group {
          padding: 0;
          position: relative;
        }
        input[type='text'] {
          padding: 10px;
          display: block;
          width: 100%;
        }
        .first-name {
          grid-column: 1/3;
        }
        .last-name {
          grid-column: 3/5;
        }
        .address-1 {
          grid-column: 1/5;
        }
        .address-2 {
          grid-column: 1/5;
        }
        .city {
          grid-column: 1/3;
        }
        .button {
          justify-self: end;
          grid-column: 4/5;
        }
        .button button {
          cursor: pointer;
          padding: 10px 25px;
          background: #1e5799; /* Old browsers */
          background: -moz-linear-gradient(
            top,
            #1e5799 0%,
            #2989d8 50%,
            #207cca 51%,
            #7db9e8 100%
          ); /* FF3.6-15 */
          background: -webkit-linear-gradient(
            top,
            #1e5799 0%,
            #2989d8 50%,
            #207cca 51%,
            #7db9e8 100%
          ); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(
            to bottom,
            #1e5799 0%,
            #2989d8 50%,
            #207cca 51%,
            #7db9e8 100%
          ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          border: 1px solid;
          color: white;
          border-radius: 5px;
        }
        .closing-btn {
          position: absolute;
          z-index: 3;
          right: 20px;
          top: 0;
          font-size: 2rem;
          color: white;
          padding: 20px;
        }
        .closing-btn i {
        }
      </style>
      <section class="form-popup ${this.newValue}">
        <form @submit="${this.submitForm}">
          <div class="closing-btn">
            <h1 @click="${this.closeDamnScreen}">X</h1>
          </div>
          <h2>Add a new contact</h2>
          <div class="form-group first-name">
            <label for="first_name">First Name</label>
            <input type="text" name="first_name" @keyup="${this.change}" />
          </div>
          <div class="form-group last-name">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" @keyup="${this.change}" />
          </div>
          <div class="form-group address-1">
            <label for="address_1">Address 1</label>
            <input type="text" name="address_1" @keyup="${this.change}" />
          </div>
          <div class="form-group address-2">
            <label for="address_2">Address 2</label>
            <input type="text" name="address_2" @keyup="${this.change}" />
          </div>
          <div class="form-group city">
            <label for="city">City</label>
            <input type="text" name="city" @keyup="${this.change}" />
          </div>
          <div class="form-group zipcode">
            <label for="zipcode">zipcode</label>
            <input type="text" name="zipcode" @keyup="${this.change}" />
          </div>
          <div class="form-group state">
            <label for="state">state</label>
            <input type="text" name="state" @keyup="${this.change}" />
          </div>
          <div class="form-group phone_number">
            <label for="phone_number">Phone Number</label>
            <input type="text" name="phone_number" @keyup="${this.change}" />
          </div>
          <div class="form-group category">
            <label for="category">category</label>
            <input type="text" name="category" @keyup="${this.change}" />
          </div>
          <div class="form-group favorites">
            <label for="favorites">favorites</label>
            <input type="text" name="favorites" @keyup="${this.change}" />
          </div>
          <div class="button">
            <button type="submit">Add Contact</button>
          </div>
        </form>
      </section>
    `;
  }
}

//   Here goes another element

customElements.define('form-popup', FormPopup);
