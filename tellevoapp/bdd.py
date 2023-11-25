import sqlite3 as sql

def createDB():
    conn = sql.connect("users.db")
    conn.commit()
    conn.close()
    
def createTable():
    conn = sql.connect("users.db")
    cursor = conn.cursor()
    cursor.execute(
        """ CREATE TABLE alumno2 (
            id INTERGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )
        """
    )    
    
if __name__ == "__main__":
    createDB()
    createTable()