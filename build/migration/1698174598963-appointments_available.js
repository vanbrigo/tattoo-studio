"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsAvailable1698174598963 = void 0;
const typeorm_1 = require("typeorm");
class AppointmentsAvailable1698174598963 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        enum: ["10:00", "11:00", "14:00", "15:00", "16:00"]
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
            }), true);
            yield queryRunner.createIndex('appointments_available', new typeorm_1.TableIndex({
                name: 'unique_date_time_tattoo_artist_id',
                columnNames: ['date', 'time', 'tattoo_artist_id'],
                isUnique: true,
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("appointments_available");
            yield queryRunner.dropIndex("appointments_available", "unique_date_time_tattoo_artist_id");
        });
    }
}
exports.AppointmentsAvailable1698174598963 = AppointmentsAvailable1698174598963;
