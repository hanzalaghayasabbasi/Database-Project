# Database-Project
This is my Database lab Project in the University
<b> Features: </b>
1 Strong Password Policy on the Login and SignUp Pages.
Password Policy: Requires a minimum of 10 characters, including at least 2 special characters and 1 number.
2 Storing Three Types of Logs: Failure, Success, and Both.
3 Using Parameterized Queries to Prevent SQL Injection Attacks.
4 Using bcrypt with a salt factor of 10 for storing Passwords in the Database.
5 Continuous Monitoring of Login in the Console.

Note: I am using Microsoft Workbench as a database. Integrating it with Express is difficult because I did not find any help on how to configure Express to work with Workbench. ChatGPT helped me a lot in this task.

Below is our Login Portal

![image](https://github.com/hanzalaghayasabbasi/Database-Project/assets/123712590/b5361f52-0b0e-4162-8c38-b41401335a47)

If user try to login with credential that is not present in database it ask for register

![image](https://github.com/hanzalaghayasabbasi/Database-Project/assets/123712590/14d5dd71-26c0-4c90-82ea-2a0d7932fa1d)

Registering the user

![image](https://github.com/hanzalaghayasabbasi/Database-Project/assets/123712590/66ddc8b2-a584-44c9-a2ca-8ebd5a44e2b6)

After Successfull Registrating it will tell us Registration successfull.

![image](https://github.com/hanzalaghayasabbasi/Database-Project/assets/123712590/f4f97ccb-3eb9-4b5e-ad05-958783167f5e)

As we can see, the user we have registered is now in the database, and the password is stored hashed in the database.

![image](https://github.com/hanzalaghayasabbasi/Database-Project/assets/123712590/14b08778-0d0f-4ee6-b39a-44da0eeaeada)

Now we will login with the user which we have regiter.

![image](https://github.com/hanzalaghayasabbasi/Database-Project/assets/123712590/fd0da759-b466-4ac4-bc2f-ac2de9844a4e)

After Succeffully login with credential it will redirect us to the Cyber Awareness Page.

![image](https://github.com/hanzalaghayasabbasi/Database-Project/assets/123712590/e3397e7a-8fd6-434e-84ff-e8580421853f)






