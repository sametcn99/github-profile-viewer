
# Github Profile Viewer

Welcome to the GitHub Profile Viewer, a dynamic web platform powered by Next.js and Radix UI. Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST API to retrieve comprehensive information. Discover a user's coding journey and contributions to the open-source community.

<a href="https://chromewebstore.google.com/detail/gpv-opener/abgechjdbcnlcdcmhkaakobeoimjgkmb">
  <img src="https://raw.githubusercontent.com/sametcn99/github-profile-viewer/master/public/icons/chrome-extension-dark.png" alt="Google Chrome Extension" width="200">
</a>

## Key Features

- View detailed repository information, including names and descriptions.
- Explore a user's followers and those they follow.
- Check out contribution statistics, including commit history.
- Discover public Gists and their content.

## Why use Github Profile Viewer?

Our platform provides a user-friendly interface to navigate through GitHub profiles efficiently. Whether you are an open-source enthusiast, a hiring manager, or just curious about a developer's work, Github Profile Viewer offers valuable insights.

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
