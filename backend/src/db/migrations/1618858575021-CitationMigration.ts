import {MigrationInterface, QueryRunner} from "typeorm";

export class CitationMigration1618858575021 implements MigrationInterface {
    name = 'CitationMigration1618858575021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "citation" ("code" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "link" varchar NOT NULL, "project" varchar NOT NULL, "notes" varchar NOT NULL, "createAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "citation"`);
    }

}
