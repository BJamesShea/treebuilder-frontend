# Tree Builder – DSA Final

This is my final project for the Data Structures & Algorithms course. It's a full-stack app that builds binary trees from user input.

## How It Works

- The user enters a list of numbers (like `4,2,6,1,3,5,7`)
- The backend (Spring Boot + MySQL) turns it into a binary search tree
- The frontend (React) shows the final tree structure
- Every tree gets saved to the MySQL database
- Button to view all saved trees

## Tech Stack

- **Frontend:** React
- **Backend:** Spring Boot (Java 21)
- **Database:** MySQL
- **No Lombok** – wrote all the boilerplate manually to reinforce fundamentals

## Features

- Comma-separated input for tree generation
- Returns clean JSON of the built tree
- Stores all trees in the DB
- Option to view previously submitted trees
- Styled with a subtle tan/orange theme ( I think it's pretty but who knows )


## How to Run

1. Start MySQL and create a `treebuilder` database
2. Make sure your `application.properties` file is updated with your credentials
3. Run the backend via IntelliJ or `mvn spring-boot:run`
4. In another terminal, run the frontend with:

```bash
npm install
npm start

```

-- Brandon Shea

