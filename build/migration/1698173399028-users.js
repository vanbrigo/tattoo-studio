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
exports.Users1698173399028 = void 0;
const typeorm_1 = require("typeorm");
class Users1698173399028 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "20"
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
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("users");
        });
    }
}
exports.Users1698173399028 = Users1698173399028;
