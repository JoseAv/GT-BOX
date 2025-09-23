import { Sequelize } from "sequelize";
import { config } from "../../env/env.js";


export const db = new Sequelize(config.username, config.username, config.password, {
    host: 'localhost',
    dialect: 'postgres'
});


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

