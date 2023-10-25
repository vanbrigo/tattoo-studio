import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class AppointmentsAvailable1698174598963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments_available",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "date",
                        type: "date",
                    },
                    {
                        name: "time",
                        type: "enum",
                        enum:["10:00","11:00","14:00","15:00","16:00"]
                    },
                    {
                        name: "tattoo_artist_id",
                        type: "int",
                    },
                    {
                        name: "is_available",
                        type: "boolean",
                        default: true
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["tattoo_artist_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        )
        await queryRunner.createIndex('appointments_available', new TableIndex({
            name: 'unique_date_time_tattoo_artist_id',
            columnNames: ['date', 'time', 'tattoo_artist_id'],
            isUnique: true,
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments_available")
        await queryRunner.dropIndex("appointments_available","unique_date_time_tattoo_artist_id")
    }

}
