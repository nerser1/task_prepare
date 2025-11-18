import express from "express";
import mysql2 from "mysql2/promise";
import type { Request, Response, NextFunction } from "express";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

app.post("/user", (req: Request, res: Response) => {
  const user = req.body;
  res.json({ message: "User received", user });
});

app.get("/hc", async (req, res, next) => {
  try {    const result = await ((await mysql2.createPool({
        host: "localhost",
        user: "root",
        password: "rootroot",
        database: "mydatalecturer",
        port: 3306,
        connectionLimit: 10,
    }))?.execute("select * from mydatalecturer.lecturers", []))
    console.log(`\x1b[31m HEALTH_CHECK \x1b[0m`);
    res.send("Api is Running___" + result?.length);
  } catch (error) {
    next(error);
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
