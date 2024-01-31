
# Github Profile Viewer

Welcome to the GitHub Profile Viewer, a dynamic web platform powered by Next.js and Radix UI. This platform provides a comprehensive and user-friendly interface for exploring GitHub profiles and gaining valuable insights into developers' open-source contributions.

<a href="https://chromewebstore.google.com/detail/gpv-opener/abgechjdbcnlcdcmhkaakobeoimjgkmb">
  <img src="https://raw.githubusercontent.com/sametcn99/github-profile-viewer/master/public/icons/chrome-extension-dark.png" alt="Google Chrome Extension" width="200">
</a>

## Key Features

- **Seamless Navigation and Comprehensive Repository Information:**
  - Explore GitHub profiles seamlessly with a user-friendly interface.
  - Gain in-depth insights into repositories, including names and descriptions.

- **Efficient Exploration of User Connections:**
  - Efficiently explore a user's network by checking their followers and those they follow.

- **Insights into Contribution Statistics and Star History:**
  - Evaluate a developer's commitment to projects with detailed contribution statistics.
  - Visualize a developer's impact on the GitHub community by exploring repositories that have garnered stars.

- **Public Gists and Diverse Coding Styles:**
  - Delve into public Gists and uncover the diverse coding styles and preferences of developers.

- **The Technology Behind the Magic:**
  - GitHub Profile Viewer leverages the robust GitHub REST API to fetch comprehensive information in real-time.
  - The use of Next.js and Radix UI guarantees a smooth and responsive experience.

- **A Game-Changer in Employee Recruitment:**
  - Recruiters and hiring managers can effortlessly explore the detailed repository information of job applicants.
  - Identify key influencers in a candidate's professional circle by examining their followers and those they follow.
  - The Star History feature allows recruiters to gauge the impact of a candidate's projects.

- **Unveiling Universal User Statistics:**
  - GitHub Profile Viewer opens the doors to universal accessibility, allowing users to explore the coding landscape of every GitHub user.
  - Gain a holistic understanding of users' coding proficiency, commitment, and community impact by consolidating statistics from various repositories.
  - Effortlessly compare user statistics for comprehensive analysis.

## Why use Github Profile Viewer?

GitHub Profile Viewer offers valuable insights for various users, including open-source enthusiasts, hiring managers, and those curious about developers' work. Maximize your usage to uncover the full potential of developers' profiles.

## Getting Started

To get started with Github Profile Viewer, follow the steps below:

### Installation

- Clone the repository:

```bash
git clone https://github.com/sametcn99/github-profile-viewer.git
````

- Install dependencies:

```bash
cd github-profile-viewer
npm install
```

- Create a `.env.local` file in the project root and add the following:
   -- [Create Personal Access Token Here](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

```env
GH_TOKEN="your-api-token"
```

Replace `https://api.github.com` with your GitHub API endpoint if needed.

- Run the application:

```bash
npm run dev
```

- Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Contributing

If you'd like to contribute to Github Profile Viewer, feel free to open an issue or submit a pull request. We welcome any suggestions, bug reports, or feature requests.

## License

This project is licensed under the [GPL 3.0](LICENSE). Feel free to use and modify the code as per your requirements.

---

Thank you for using Github Profile Viewer! Explore and enjoy the world of open source.

## Useful Links

- [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub REST API Rate Limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28)
- [Octokit Documentation](https://octokit.github.io/rest.js/v20)
- [Material-UI Charts](https://mui.com/x/react-charts/)
