import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedDb1644498466565 implements MigrationInterface {
    name = 'SeedDb1644498466565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO tags (name) VALUES ('music'), ('coffee'), ('tea')`,
        )
        //password is 1234
        await queryRunner.query(
            `INSERT INTO users (username, email, password) VALUES ('Max', 'max@gmail.com', '$2b$10$sMqoyH3puLSty3PXGmBJ0OqVP1nogZP4Etsmw2bu5CYCFba6yU2KS')`,
        )

        await queryRunner.query(
            `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES 
        ('first-article', 'First Article', 'First Article Description', 'First Article Body', 'music, coffee', 1)`,
        )

        await queryRunner.query(
            `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES 
        ('second-article', 'Second Article', 'Second Article Description', 'Second Article Body', 'music, tea', 1)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
