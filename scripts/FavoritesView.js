import GitHubUser from "./GitHubUser.js";

export class Favorites {
  constructor() {
    this.tbody = document.querySelector("#app table tbody");
  }

  load() {
    try {
      document.querySelector("form").onsubmit = (evt) =>
        this.handleSubmit(evt, this);
      this.profiles = JSON.parse(localStorage.getItem("git-favs")) || [];
    } catch (e) {
      console.log(e);
      this.profiles = [];
    } finally {
      this.updateView();
    }
  }

  addProfile(user) {
    this.profiles = [user, ...this.profiles];
    this.updateView();
  }

  updateView() {
    this.removeAllTableRows();
    if (this.profiles.length == 0) {
      this.tbody.appendChild(this.createEmptyListAdvise());
    } else {
      this.profiles.forEach((profile) =>
        this.tbody.appendChild(this.createTableRow(profile))
      );
    }
    this.saveOnLocalStorage();
  }

  createTableRow({ login, name, public_repos, followers }) {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `  
        <td class="user">
           <img src="https://github.com/${login}.png" alt="Avatar de ${name}">
           <a href="https://github.com/${login}" target="_blank">
              <p>${name}</p>
              <span>${
                login.length > 12 ? `${login.substring(0, 12)}...` : login
              }</span>
           </a>
        </td>
        <td class="repositories">${public_repos}</td>
        <td class="followers">${followers}</td>
        <td>
           <button class="remove">&times;</button>
        </td>   
      `;
    tableRow.querySelector(".remove").onclick = () => this.deleteProfile(login);
    return tableRow;
  }

  removeAllTableRows() {
    this.tbody.querySelectorAll("tr").forEach((row) => row.remove());
  }

  createEmptyListAdvise() {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td >
           <div class="user">
              <span>There's no one here...</span>
           </div>
        </td>
     `;
    return tableRow;
  }

  deleteProfile(user) {
    const isOk = confirm(
      `Do you want to remove ${user} from your list of favorite GitHub profiles?`
    );
    if (isOk) {
      this.profiles = this.profiles.filter(({ login }) => login != user);
      this.updateView();
    }
  }

  saveOnLocalStorage() {
    localStorage.setItem("git-favs", JSON.stringify(this.profiles));
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const usernameInput = evt.target.querySelector("#user-search");
    if (usernameInput.value && this.userDontExistis(usernameInput.value)) {
      this.userDontExistis(usernameInput.value);
      const user = await GitHubUser.searchUser(usernameInput.value);
      if (user) {
        evt.target[0].value = "";
        this.addProfile(user);
      }
    } else {
      alert("User already existis");
    }
  }

  userDontExistis(username) {
    return this.profiles.filter(({ login }) => login == username).length == 0;
  }
}
