import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Users1698173399028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique:true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length:"100",
                        isNullable:true
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["user", "tattoo_artist", "admin", "super_admin"],
                        default: '"user"'
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "joined_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
