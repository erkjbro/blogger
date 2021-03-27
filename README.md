# Verbose-Octo-Blog: VOB

A blogging app. Starting with a simple monolithic MERN structure and then iterating with improvements. The main purpose of this app is to make a straightforward design and then build upon it.

## VOB Roadmap
> This is a living roadmap and not yet completed.

### v0.1.0
- Build the MERN App - Basic Starting Version
  * Web Client - React
    - Public & protected areas
    - SCSS styling & start UIKit
    - Decent UI just to interact with backend
  * API - Node.js + Express
    - CRUD for blogs
    - CRUD for users
    - auth with jwts
  * Database Connection - MongoDB (Atlas)

### Feature Backlog
- Build out the UIKit
  * modal
  * error modal
  * backdrop
  * form elements (Formik?)
  * responsive updates
  * animations

- Auth Improvements
  * Confirm password for signup
  * Email user to verify account after successful signup
  * Password recovery & changing
  * MFA
  * Captcha
    - h?
    - re?
  * IAM / Federation?

- Image/File Handling
  * Configure S3 storage for assets/images
  * Generate pdfs.
    - Allow users to request a copy of their data.
    - Perhaps email users with the pdf attached.
    - Store pdfs in S3 bucket? Prefer to delete them.

- User Model Improvements
  * Make user profiles more realistic and comparable to other apps. User Bio, picture, social links, alternate email, etc.

- Blog Model Improvements
  * Content should probably be an array of data. Allow users to add
  multiple paragraphs and images between. Like a real blog.
  * Improve blog create / edit page.

- Enhance app for prod deployment
  * Compression
  * Security Headers
  * ...rest

- Configure AWS Architecture
  * eb cli deployment
  * amplify frontend

- Dockerize app

- Implement caching strategy using Redis
  * Redis docker container for dev
  * Redis ElastiCache for prod

- Testing everywhere!
  * unit & integration?
  * e2e?

- Create alternate client built around Redux

- Create mobile client with React Native

- Convert api to TypeScript

- Convert client(s) to TypeScript

- Make alternate GraphQL version of app?

- Decouple app and create a microservice architecture
  * SAM? Deploy containers to lambdas? Probably going serverless.

# Get started
 * Clone the project.
 * `yarn install`: Install all dependencies. Be sure to do this in the project root and also the `backend` and `frontend`.
 * `yarn start`: Start the project for development

# Project structure & architecture

 **Dependencies:**

  - [x] concurrently

 **Project Structure:**

VOB is being developed with a monolithic structure for the sake of simplicity. The *React* web client is stored in the `frontend`
directory, and the *Node.js* rest api is in the `backend` directory. There will be more details about the structure of each
component within their respective directories.

# Development Workflow
> Feature Branch Workflow, Git Workflow, or another Workflow Strategy? `main`, `develop`, `feature`, `release`, `hotfix`, or `bug` Branches? Branch naming conventions? Add notes about you & your team's workflow methodology.

> Notes on the project's convention for features, hotfixes, release, etc.

## Pull Request Guidelines
   * Fetch the latest main: `git pull origin main` or `git fetch origin main` (Don't forget to stay on `main` branch)
   * Create a new branch: `git checkout -b new-branch`.
   * Make your changes and commit often.
   * Were commits pushed to `origin`? If so, you should rebase your branch. Fetch with `git fetch origin main` and run
   `git rebase main`.
   * Resolve conflicts on each commit. Do it with `kdiff3` or anything that suits you. Add these modification and run `git rebase --continue` until you've cleared all conflicts.
   * Test your code.
   * Push your code.
      - If the branch is new, you just use `git push origin new-branch`.
      - If you had to rebase, you'll need to force the push with `git push origin new-branch -f`.
   * Create the PR and point to the [`main` / `develop`] Branch.

# DevOps Info
> Development, Staging, and Production Info?

Nothing for now! The plan is to use Amplify for the web client and more of AWS for the backend architecture.

# Collaborators

| Name | Role | Contact | Timezone |
| --- | --- | --- | --- |
| Erik J Brown | Developer | erkjbro@erikjbrown.tech | USA (GMT-5) |
