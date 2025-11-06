import mysql from 'mysql2/promise'

// Configuración de la conexión MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'econoky',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Crear pool de conexiones
let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

// Función helper para ejecutar queries
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  const connection = getPool()
  const [rows] = await connection.execute(sql, params || [])
  return rows as T[]
}

// Función helper para ejecutar una query y obtener un solo resultado
export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const results = await query<T>(sql, params)
  return results.length > 0 ? results[0] : null
}

// Función helper para ejecutar INSERT, UPDATE, DELETE
export async function execute(
  sql: string,
  params?: any[]
): Promise<{ affectedRows: number; insertId?: number }> {
  const connection = getPool()
  const [result] = await connection.execute(sql, params || [])
  const mysqlResult = result as mysql.ResultSetHeader
  return {
    affectedRows: mysqlResult.affectedRows,
    insertId: mysqlResult.insertId,
  }
}

// Cerrar el pool (útil para tests o shutdown)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}

