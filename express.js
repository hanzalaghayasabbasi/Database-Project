const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const winston = require('winston');
const mysql =require('mysql2');
const multer = require('multer');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const upload = multer();
app.use(upload.none());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());



app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname + '/StyleSheet.css');
});

app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/javascript.js');
});

app.get('/register.html', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.get('/reg.css', (req, res) => {
  res.sendFile(__dirname + '/reg.css');
});

app.get('/reg.js', (req, res) => {
  res.sendFile(__dirname + '/reg.js');
});


app.get('/styles_02.css', (req, res) => {
  res.sendFile(__dirname + '/styles_02.css');
});












// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'users',
  port: 3306,
 // connectionLimit: 10,
});

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const promiseConnection = pool.promise(); // Using promise version

    promiseConnection.getConnection()
      .then(connection => {
        console.log('Connected to the database');
        resolve(connection);
      })
      .catch(error => {
        console.error('Error connecting to the database:', error);
        reject(error);
      });
  });

}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'audit.log'}),
    new winston.transports.File({ filename: 'failed_login_attempts.log', level: 'warn' }),
    new winston.transports.File({ filename: 'successful_logins.log', level: 'info' }),
  ],
});







app.post('/submit_registration', async (req, res) => {
//  console.log('Request Body:', req.body)
  try {
    // Handle form submission logic here
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

  
    const connection = await connectToDatabase();

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
    
    // Insert data into the database using parameterized query
    const query = 'INSERT INTO user_info (user_name, email, hashed_password) VALUES (?, ?, ?)';
    // -> debugging console.log('SQL Query:', query, [username, email, password]);

    const result = await connection.query(query, [username, email, hashedPassword]);

    console.log('Data inserted into the database:', result[0].affectedRows);

    logger.info(`Registration successful: User ${username}, Email ${email}`);
    // Release the connection back to the pool
    connection.release();

    // Send a response back to the client
    res.status(200).send('Registration successful!');
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    logger.error(`Error inserting data into the database: ${error}`);
    // Send an error response back to the client
    res.status(500).send('Internal Server Error');
  }
});



app.post('/login', async (req, res) => {
      
    try {
      const email = req.body.email;
      const password = req.body.password;
    
        // Check the database for the provided email
        const connection = await connectToDatabase();
        const [results] = await connection.query('SELECT * FROM user_info WHERE email = ?', [email]);
    
        if (results.length > 0) {
          // User found, compare passwords
          const storedHashedPassword = results[0].hashed_password;
    
          // Compare the provided password with the stored hashed password
          const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
    
          if (passwordMatch) {
             logger.info(`Login successful: User with Email ${email}`);
            // Redirect to a success page
             res.redirect('/success_page.html');
          } else {
            // res.status(200).send('1Login not successful');
            logger.warn(`Login unsuccessful: Invalid password for User with Email ${email}`);
            res.redirect('/failure_page.html');
          }
        } else {
          
        //  res.status(200).send('2Login not successful');       
             logger.warn(`Login unsuccessful: Invalid password for User with Email ${email}`);
          // Email not found, redirect to a failure page or display an error message
             res.redirect('/failure_page.html');
        }
    
        // Release the connection back to the pool
        connection.release();
    
      }
      catch (error) {
      
      logger.error(`Error during login: ${error}`);  
      console.error('Error inserting data into the database:', error);
  
      // Send an error response back to the client
      res.status(500).send('Internal Server Error');
    }
  });

// app.get('/th', async (req, res) => {
//   try {
//     await performHealthCheck();
//     res.status(200).send('OK');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// ...


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
