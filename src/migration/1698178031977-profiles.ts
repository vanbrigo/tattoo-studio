import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Profiles1698178031977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "profiles",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length:"100",
                        isNullable:true
                    },
                    {
                        name: "birthdate",
                        type: "date",
                    },
                    {
                        name: "gender",
                        type: "enum",
                        enum:["female","male","non_binary"],
                        default:'"non_binary"'
                    },
                    {
                        name: "address",
                        type: "varchar",
                        length:"255",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("profiles")
    }

}
