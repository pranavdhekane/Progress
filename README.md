# Progress

**Progress** is a personal journal-like tool built using React, Tailwind CSS, and PostgreSQL, designed to track progress and self-reflection. It allows users to document their daily activities, set goals, and visualize their growth over time. The project was developed as part of my journey to practice React and improve web development skills.

## Features

- **Personal Journal**: Track your daily progress and activities.
- **PostgreSQL Database**: A local database is used to store entries, goals, and other progress-related data.
- **Self-Reflection**: Offers a chance to review your past entries and reflect on your personal growth.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For utility-first CSS styling.
- **PostgreSQL**: For storing journal entries and other data.
- **ShadCN UI**: Used for UI components.

## Setup

To get started with the project, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [PostgreSQL](https://www.postgresql.org/) 

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/pranavdhekane/Progress.git 
   ```

2. Navigate into the project directory:

    ```bash
    cd Progress
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up your local PostgreSQL database:
    
    Make sure PostgreSQL is running and create a database named progressdb.
    And create a table in progressdb
    ```bash
    CREATE TABLE form_data
    (
        steps integer NOT NULL,
        other_exercise jsonb,
        emo_rate integer NOT NULL,
        phy_rate integer NOT NULL,
        int_rate integer NOT NULL,
        message text COLLATE pg_catalog."default",
        accomplishments jsonb,
        regrets jsonb,
        date date NOT NULL DEFAULT (now() AT TIME ZONE 'GMT-4.30'::text),
        CONSTRAINT form_data_pkey PRIMARY KEY (date),
        CONSTRAINT form_data_steps_check CHECK (steps >= 0),
        CONSTRAINT form_data_emo_rate_check CHECK (emo_rate >= 0 AND emo_rate <= 10),
        CONSTRAINT form_data_phy_rate_check CHECK (phy_rate >= 0 AND phy_rate <= 10),
        CONSTRAINT form_data_int_rate_check CHECK (int_rate >= 0 AND int_rate <= 10)
    );
    ```

5. update the password in server.js for your db.

6. End Step.

    Run to start the project 
    ```
    node progress.js  
    ```