import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';

export default class ContactsList extends LitElement {
  constructor() {
    super();
  }
  static get properties() {
    return {
      color: { type: String },
    };
  }

  firstUpdated() {}
  render() {
    return html`
      <style>
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
      </style>
      <section class="contacts">
        <h2>Contacts</h2>
        <div class="contact">
          <div class="user-img"></div>
          <div class="fullname">
            <span class="text">Manuel Rodriguez</span>
            <span class="sub">Full Name</span>
          </div>
          <div class="number">
            <span class="text">+79656052283</span>
            <span class="sub">Phone number</span>
          </div>
          <div class="state">
            <span class="text">Kazan</span>
            <span class="sub">City</span>
          </div>
          <div class="category">
            <span class="text">Family</span>
            <span class="sub">Category</span>
          </div>
        </div>
        <div class="contact">
          <div class="user-img"></div>
          <div class="fullname">
            <span class="text">Manuel Rodriguez</span>
            <span class="sub">Full Name</span>
          </div>
          <div class="number">
            <span class="text">+79656052283</span>
            <span class="sub">Phone number</span>
          </div>
          <div class="state">
            <span class="text">Kazan</span>
            <span class="sub">City</span>
          </div>
          <div class="category">
            <span class="text">Family</span>
            <span class="sub">Category</span>
          </div>
        </div>
      </section>
    `;
  }
}

//   Here goes another element

customElements.define('contacts-list', ContactsList);
