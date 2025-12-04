import {
  SQLiteConnection,
  CapacitorSQLite,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection; //Maneja las conexiones a la db
  private db: SQLiteDBConnection | null = null; //Conexión a mi db, se inicializa con null para que no haya problemas hasta que se inicie
  private plataform: string; //android, ios, web
  private isInitialized: boolean = false; //Flag para controlar si ya he conectado con la db

  constructor() {
    //Recoge la platafroma en la que se está ejecutando
    this.plataform = Capacitor.getPlatform();

    //Creo el gestor de la bd
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initializeDatabase() {
    if (this.isInitialized) return;

    try {
      this.db = await this.sqlite.createConnection(
        'personal.db', //Nombre del archivo de la db
        false, //Estará encriptada? No
        'no-encryption', //Modo de encriptación -> Ninguno
        1, //Versión de la db
        false //Es solo de lectura? No
      );

      await this.db.open(); //Se abre la conexión con las propiedades de arriba

      await this.createTables();
    } catch (error) {
      console.log('Error iniciando la DB: ', error);
    }
  }

  private async createTables() {
    const configTable = `
      CREATE TABLE IF NOT EXISTS configuracion (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        sueldo_mensual REAL NOT NULL DEFAULT 0,
        porcentaje_ahorro REAL DEFAULT 0,
        fecha_actualizacion TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const categoriasTable = `
      CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE,
        color TEXT DEFAULT '#3880ff',
        icono TEXT,
        es_fijo INTEGER DEFAULT 0,
        activa INTEGER DEFAULT 1
      );
    `;

    const gastosFijosTable = `
      CREATE TABLE IF NOT EXISTS gastos_fijos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria_id INTEGER NOT NULL,
        descripcion TEXT NOT NULL,
        cantidad REAL NOT NULL,
        dia_pago INTEGER,
        activo INTEGER DEFAULT 1,
        fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id)
      );
    `;

    const gastosTable = `
      CREATE TABLE IF NOT EXISTS gastos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria_id INTEGER NOT NULL,
        descripcion TEXT NOT NULL,
        cantidad REAL NOT NULL,
        fecha_gasto TEXT DEFAULT CURRENT_TIMESTAMP,
        imagen_ticket TEXT,
        notas TEXT,
        fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id)
      );
    `;

    const ingresosTable = `
      CREATE TABLE IF NOT EXISTS ingresos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        concepto TEXT NOT NULL,
        cantidad REAL NOT NULL,
        fecha TEXT DEFAULT CURRENT_TIMESTAMP,
        es_recurrente INTEGER DEFAULT 0
      );
    `;

    await this.db?.execute(configTable);
    await this.db?.execute(categoriasTable);
    await this.db?.execute(gastosFijosTable);
    await this.db?.execute(gastosTable);
    await this.db?.execute(ingresosTable);

    // Datos iniciales
    await this.db?.run(`
      INSERT OR IGNORE INTO configuracion (id, sueldo_mensual, porcentaje_ahorro) 
      VALUES (1, 0, 10)
    `);

    await this.insertDefaultCategories();
  }

  private async insertDefaultCategories() {
    const defaultCategories = [
      {
        nombre: 'Alimentación',
        color: '#2dd36f',
        icono: 'fast-food',
        es_fijo: 0,
      },
      { nombre: 'Transporte', color: '#ffc409', icono: 'car', es_fijo: 0 },
      {
        nombre: 'Ocio',
        color: '#eb445a',
        icono: 'game-controller',
        es_fijo: 0,
      },
      { nombre: 'Vivienda', color: '#3880ff', icono: 'home', es_fijo: 1 },
      { nombre: 'Servicios', color: '#92949c', icono: 'flash', es_fijo: 1 },
      { nombre: 'Salud', color: '#10dc60', icono: 'medkit', es_fijo: 0 },
      {
        nombre: 'Otros',
        color: '#222428',
        icono: 'ellipsis-horizontal',
        es_fijo: 0,
      },
    ];

    for (const cat of defaultCategories) {
      await this.db?.run(
        `INSERT OR IGNORE INTO categorias (nombre, color, icono, es_fijo) VALUES (?, ?, ?, ?)`,
        [cat.nombre, cat.color, cat.icono, cat.es_fijo]
      );
    }
  }

  // ===== CONFIGURACIÓN =====
  async getConfiguracion() {
    const result = await this.db?.query(
      'SELECT * FROM configuracion WHERE id = 1'
    );
    return result?.values?.[0] || null;
  }

  async updateSueldo(sueldo: number) {
    await this.db?.run(
      'UPDATE configuracion SET sueldo_mensual = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = 1',
      [sueldo]
    );
  }

  async updatePorcentajeAhorro(porcentaje: number) {
    await this.db?.run(
      'UPDATE configuracion SET porcentaje_ahorro = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = 1',
      [porcentaje]
    );
  }

  // ===== GASTOS FIJOS =====
  async addGastoFijo(
    categoriaId: number,
    descripcion: string,
    cantidad: number,
    diaPago?: number
  ) {
    const result = await this.db?.run(
      'INSERT INTO gastos_fijos (categoria_id, descripcion, cantidad, dia_pago) VALUES (?, ?, ?, ?)',
      [categoriaId, descripcion, cantidad, diaPago || null]
    );
    return result?.changes?.lastId;
  }

  async getGastosFijos() {
    const sql = `
      SELECT gf.*, c.nombre as categoria_nombre, c.color as categoria_color
      FROM gastos_fijos gf
      JOIN categorias c ON gf.categoria_id = c.id
      WHERE gf.activo = 1
      ORDER BY gf.cantidad DESC
    `;
    const result = await this.db?.query(sql);
    return result?.values || [];
  }

  async getTotalGastosFijos() {
    const result = await this.db?.query(
      'SELECT SUM(cantidad) as total FROM gastos_fijos WHERE activo = 1'
    );
    return result?.values?.[0]?.total || 0;
  }

  async deleteGastoFijo(id: number) {
    await this.db?.run('UPDATE gastos_fijos SET activo = 0 WHERE id = ?', [id]);
  }

  // ===== GASTOS VARIABLES =====
  async addGasto(
    categoriaId: number,
    descripcion: string,
    cantidad: number,
    imagenTicket?: string,
    notas?: string
  ) {
    const result = await this.db?.run(
      'INSERT INTO gastos (categoria_id, descripcion, cantidad, imagen_ticket, notas) VALUES (?, ?, ?, ?, ?)',
      [categoriaId, descripcion, cantidad, imagenTicket || null, notas || null]
    );
    return result?.changes?.lastId;
  }

  async getGastos(mes?: string) {
    const fechaFiltro = mes || new Date().toISOString().slice(0, 7);

    const sql = `
      SELECT g.*, c.nombre as categoria_nombre, c.color as categoria_color
      FROM gastos g
      JOIN categorias c ON g.categoria_id = c.id
      WHERE strftime('%Y-%m', g.fecha_gasto) = ?
      ORDER BY g.fecha_gasto DESC
    `;
    const result = await this.db?.query(sql, [fechaFiltro]);
    return result?.values || [];
  }

  async getTotalGastosMes(mes?: string) {
    const fechaFiltro = mes || new Date().toISOString().slice(0, 7);

    const result = await this.db?.query(
      `SELECT SUM(cantidad) as total FROM gastos WHERE strftime('%Y-%m', fecha_gasto) = ?`,
      [fechaFiltro]
    );
    return result?.values?.[0]?.total || 0;
  }

  async deleteGasto(id: number) {
    await this.db?.run('DELETE FROM gastos WHERE id = ?', [id]);
  }

  // ===== RESUMEN FINANCIERO =====
  async getResumenMes(mes?: string) {
    const config = await this.getConfiguracion();
    const gastosFijos = await this.getTotalGastosFijos();
    const gastosVariables = await this.getTotalGastosMes(mes);

    const totalGastos = gastosFijos + gastosVariables;
    const ahorroPrevisto =
      (config.sueldo_mensual * config.porcentaje_ahorro) / 100;
    const disponible = config.sueldo_mensual - totalGastos - ahorroPrevisto;

    return {
      sueldo: config.sueldo_mensual,
      gastosFijos,
      gastosVariables,
      totalGastos,
      porcentajeAhorro: config.porcentaje_ahorro,
      ahorroPrevisto,
      disponible,
      estado: disponible >= 0 ? 'bien' : 'apretado',
    };
  }

  // ===== CATEGORÍAS =====
  async getCategorias() {
    const result = await this.db?.query(
      'SELECT * FROM categorias WHERE activa = 1 ORDER BY nombre'
    );
    return result?.values || [];
  }

  // ===== DEBUG (útil para ver la estructura) =====
  async getTables() {
    const sql = "SELECT name FROM sqlite_master WHERE type='table'";
    const result = await this.db?.query(sql);
    return result?.values || [];
  }

  async getTableInfo(tableName: string) {
    const sql = `PRAGMA table_info(${tableName})`;
    const result = await this.db?.query(sql);
    return result?.values || [];
  }

  async getDatabaseSchema() {
    const tables = await this.getTables();
    const schema: any = {};

    for (const table of tables) {
      const info = await this.getTableInfo(table.name);
      schema[table.name] = info;
    }

    return schema;
  }
}
