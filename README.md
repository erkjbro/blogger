# Verbose-Octo-Blog: VOB

A blogging app. Starting with a simple monolithic MERN structure and then iterating with improvements. The main purpose of this app is to make a straightforward design and then build upon it.

## VOB Roadmap
> This is a living roadmap and not yet completed.

### v0.1.0
- Build the MERN App
  * Web Client - React
  * API - Node.js + Express
  * Database Connection - MongoDB (Atlas)

### v0.2.0
- Image/File Handling
  * Configure S3 storage for assets/images
- Enhance app for prod deployment
- Configure AWS Architecture

### v0.x.0
- Create alternate client that utilizes redux

### v0.x.0
- Dockerize app

### v0.x.0
- Convert api to TypeScript
- Convert client to TypeScript

### v0.x.0
- Web client - formik testing

### v0.x.0
- Web client - responsive updates
- Web client - animations

### v0.x.0
- Update api for redis

### v0.x.0
- Create mobile client (react native)

### v0.x.0
- Decouple app and create a microservice architecture

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
