# Book Store

This project is a frontend implementation of an online bookstore using [React.js]. Allowing users to browse featured books, view book details, add books to their shopping cart, and proceed to checkout.

## Table of Contents

- [Book Store](#book-store)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Homepage](#homepage)
    - [Book Details](#book-details)
    - [Shopping Cart](#shopping-cart)
    - [Checkout](#checkout)
    - [Responsive Design](#responsive-design)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
## Features

### Homepage
- Displays a list of featured books.
- Includes a search bar to search for books by title or author.

### Book Details
- Clicking on a book leads to a details page showing information about the book (title, author, description, etc.).

### Shopping Cart
- Allows users to add/remove books to their shopping cart.
- Displays the total price and allows users to proceed to checkout page.

### Checkout
- Allows users to remove books to their shopping cart.
- Displays the total price and allows users to proceed to checkout.

### Responsive Design
- Ensures the website is responsive and works well on various devices.

## Technologies Used

- [React.js]: JavaScript framework for building the frontend.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): For routing in React applications.
- [axios](https://www.npmjs.com/package/axios): Used for making HTTP requests.
- [Bootstrap](https://getbootstrap.com/): CSS framework for responsive design and styling.
- [react-bootstrap](https://react-bootstrap.github.io/): React components for Bootstrap.
- [react-hook-form](https://react-hook-form.com/): Performant and flexible forms with easy-to-use validation (React).

## Installation

1. Requirements
   - [Node.js](https://nodejs.org/en)
   - [pnpm](https://pnpm.io/)

2. Clone the repository:

   ```bash
   git clone https://github.com/your-username/online-bookstore-frontend.git
   ```

3. Install dependencies:

   ```bash
   pnpm i
   ```

## Usage

- For development
   ```
   pnpm run dev
   ```
- For production
   ```
   pnpm run build

   ```
   - If you want to preview the build
      ```
      pnpm run preview
      ```

## Folder Structure
```
book-store/
│
├── src/
│   ├── components/          # Contains reusable UI components
│   ├── pages/               # Components for different pages (Homepage, Book Details, Checkout)
│   ├── services/            # API service files for fetching book data
│   ├── contexts/            # Context providers used for state management
│   ├── hooks/               # Custom hooks used in the application
|   ├── utils/               # Utility/helper functions
|   ├── constants.ts         # File for global constants or configuration settings
│   └── App.tsx              # Main application file
│
├── .eslint                  # ESLint configuration file
├── package.json             # Node.js dependencies and scripts
├── pnpm-lock.yaml           # Package manager lock file
├── index.html               # HTML template
├── tsconfig.json            # TypeScript configuration file (for general configurations)
├── tsconfig.node.json       # TypeScript configuration for Node.js-related code
├── vite.config.ts           # Vite configuration file
└── README.md                # Project documentation
```