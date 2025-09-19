import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUserTables1758301316090 implements MigrationInterface {
    name = 'InitUserTables1758301316090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "picture" character varying NOT NULL, "login_type" character varying NOT NULL DEFAULT 'normal', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "swagger_user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_aa8ff0b2d2def43010180d20515" UNIQUE ("email"), CONSTRAINT "PK_2166e5cb2f8653142afe88317f6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "swagger_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
