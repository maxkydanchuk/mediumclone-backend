import { ConnectionOptions } from 'typeorm'

const ormconfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts, .js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts, .js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
}

export default ormconfig
