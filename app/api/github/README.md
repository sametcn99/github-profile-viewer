# GitHub API Route

## Overview

This module provides a Next.js server function for handling GitHub API requests and responses. It includes functionality to parse request parameters, call various GitHub API endpoints using the Octokit library, and handle pagination and error cases.

## Endpoints

 `GET /api/github`

Handles various GitHub API requests based on the specified `option` parameter.

## Options

- **repos**: Retrieve a user's repositories and gists.
- **profile**: Retrieve a user's profile information.
- **trending-developers**: Retrieve a list of trending GitHub developers.
- **rate**: Retrieve information about the rate limit for the GitHub API.
- **search**: Search for GitHub users based on a username.
- **social**: Retrieve a user's social accounts associated with GitHub.
- **followers**: Retrieve a user's followers with optional pagination.
- **followings**: Retrieve a user's followings with optional pagination.

## Parameters

### 1. Get Repositories and Gists

- Example URL: `/api/github?username=exampleUser&option=repos&repoCount=200&gistCount=100&chunk=false`

### 2. Get Profile

- Example URL: `/api/github?username=exampleUser&option=profile`

### 3. Get Trending Developers

- Example URL: `/api/github?option=trending-developers`

### 4. Get Rate Limit

- Example URL: `/api/github?option=rate`

### 5. Search Users

- Example URL: `/api/github?option=search&username=searchQuery`

### 6. Get Social Accounts

- Example URL: `/api/github?option=social&username=exampleUser`

### 7. Get Followers

- Example URL: `/api/github?option=followers&username=exampleUser&page=1`

### 8. Get Followings

- Example URL: `/api/github?option=followings&username=exampleUser&page=1`

### 8. Get Commit History

- Example URL: `/api/github?option=commit-history&username=exampleUser&reponame=exampleRepo`

### 8. Event Activity

- Example URL: `/api/github?option=event-activity&username=exampleUser`
