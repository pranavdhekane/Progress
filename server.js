import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'progressdb',
    password: 'pranav@06',
    port: 5432,
});

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
    const {
        steps,
        otherExercise,
        emoRate,
        phyRate,
        intRate,
        message,
        accomplishments,
        regrets,
    } = req.body;

    const query = `
        INSERT INTO form_data (steps, other_exercise, emo_rate, phy_rate, int_rate, message, accomplishments, regrets, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW() AT TIME ZONE 'UTC')
        RETURNING *;
    `;
    const values = [
        steps,
        JSON.stringify(otherExercise),
        emoRate,
        phyRate,
        intRate,
        message,
        JSON.stringify(accomplishments),
        JSON.stringify(regrets),
    ];

    try {
        const result = await pool.query(query, values);
        res.status(201).json({ message: 'Form data submitted successfully!', data: result.rows[0] });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getLatest', async (req, res) => {
    const query = `
        SELECT *, date AT TIME ZONE 'UTC' AS utc_date, date AT TIME ZONE 'Asia/Kolkata' AS local_date
        FROM form_data
        ORDER BY date DESC
        LIMIT 10;
    `;

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching latest submissions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Rating Data
// app.get('/rating', async(req, res) => {
//     const query = ` 
//         select date AT TIME ZONE 'UTC' AS utc_date, date AT TIME ZONE 'Asia/Kolkata' AS local_date, emo_rate, phy_rate, int_rate
//         from form_data
//         order by date;
//     `;

//     try {
//         const result = await pool.query(query);
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('Error fetching latest submissions:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});