class GitHubService {
  static async searchUsers(query, retries = 3) {
    if (!query) {
      throw new Error("Empty search query.");
    }

    const accessToken = ""; // Replace with your GitHub Personal Access Token

    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("GitHub API Error:", errorData);
        throw new Error(`Failed to fetch users: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);

      if (retries > 0 && error instanceof TypeError && error.message.includes("Failed to fetch")) {
        console.log(`Retrying searchUsers (${retries} retries left)`);
        return this.searchUsers(query, retries - 1);
      } else {
        throw new Error("Failed to fetch users after retries.");
      }
    }
  }
}

export default GitHubService;
