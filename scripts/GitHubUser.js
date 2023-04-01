export default class GitHubUser {
  static async searchUser(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const { login, name, public_repos, followers } = await response.json();
      return { login, name, public_repos, followers };
    } catch (error) {
      alert(error.message);
    }
  }
}
