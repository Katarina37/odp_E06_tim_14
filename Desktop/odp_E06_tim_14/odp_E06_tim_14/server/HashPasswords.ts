import bcrypt from "bcryptjs";
import db from "../server/src/Database/connection/DbConnectionPool";

const saltRounds = 10;

async function hashExistingPasswords() {
  

  try {
    const [rows]: any = await db.execute("SELECT user_id, lozinka FROM users");
    

    for (const row of rows) {
      const plainPassword = row.lozinka;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

      await db.execute("UPDATE users SET lozinka = ? WHERE user_id = ?", [
        hashedPassword,
        row.user_id,
      ]);

      console.log(`User ${row.user_id} lozinka uspešno hesirana.`);
    }

    
  } catch (error) {
    console.error("Greska: ", error);
  } finally {
    await db.end();
  }
}

hashExistingPasswords();
