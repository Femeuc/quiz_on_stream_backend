CREATE TABLE "questions" ("id" SERIAL PRIMARY KEY, "description" varchar NOT NULL, "option_a" varchar NOT NULL, "option_b" varchar NOT NULL, "option_c" varchar NOT NULL, "option_d" varchar NOT NULL, "correct_option" varchar(1) NOT NULL, "difficulty" int NOT NULL, "subject" int NOT NULL, "author" varchar NOT NULL );
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('Com quantos paus se faz uma canoa?', 'Com nenhum.', 'Com 1.', 'Depende.', 'Não é feita com pau.', 'c', '1', '1', 'Femeuc');

CREATE TABLE "difficulties" ("id" SERIAL PRIMARY KEY, "name" varchar NOT NULL);
INSERT INTO "difficulties" ("name") VALUES ('easy'), ('normal'), ('hard');

CREATE TABLE "question_subjects" ("id" SERIAL PRIMARY KEY, "subject" varchar NOT NULL, "is_general_subject" boolean NOT NULL, "channel" varchar DEFAULT NULL, "subject_simplified" VARCHAR DEFAULT NUll);
INSERT INTO "question_subjects" ("subject", "subject_simplified", "is_general_subject", "channel") VALUES ('Gramática', 'gramatica', 'true', DEFAULT);

ALTER TABLE "questions" ADD FOREIGN KEY ("difficulty") REFERENCES "difficulties" ("id");
ALTER TABLE "questions" ADD FOREIGN KEY ("subject") REFERENCES "question_subjects" ("id");

CREATE TABLE "reports" ("id" SERIAL PRIMARY KEY, "question_id" int NOT NULL, "question_description" varchar NOT NULL, "motive" varchar NOT NULL );

CREATE TABLE "suggestions" ("id" SERIAL PRIMARY KEY, "description" varchar NOT NULL, "option_a" varchar NOT NULL, "option_b" varchar NOT NULL, "option_c" varchar NOT NULL, "option_d" varchar NOT NULL, "correct_option" varchar(1) NOT NULL, "difficulty" int NOT NULL, "subject" int NOT NULL, "author" varchar NOT NULL );
INSERT INTO "suggestions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('Com quantos paus se faz uma canoa?', 'Com nenhum.', 'Com 1.', 'Depende.', 'Não é feita com pau.', 'c', '1', '1', 'Femeuc');
ALTER TABLE "suggestions" ADD FOREIGN KEY ("difficulty") REFERENCES "difficulties" ("id");
ALTER TABLE "suggestions" ADD FOREIGN KEY ("subject") REFERENCES "question_subjects" ("id");

CREATE TABLE "subject_suggestion" ("id" SERIAL PRIMARY KEY, "subject" varchar NOT NULL, "is_general_subject" boolean NOT NULL, "channel" varchar DEFAULT NULL, "subject_simplified" VARCHAR DEFAULT NUll);
INSERT INTO "subject_suggestion" ("subject", "subject_simplified", "is_general_subject", "channel") VALUES ('Gramática', 'gramatica', 'true', DEFAULT);

CREATE TABLE "explanations" ("id" SERIAL PRIMARY KEY, "text" varchar NOT NULL, "question_id" INT NOT NULL);
ALTER TABLE "explanations" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

CREATE TABLE "explanations_suggestions" ("id" SERIAL PRIMARY KEY, "text" varchar NOT NULL, "question_id" INT NOT NULL);
ALTER TABLE "explanations_suggestions" ADD FOREIGN KEY ("question_id") REFERENCES "suggestions" ("id");

CREATE TABLE "words_list" ("id" SERIAL PRIMARY KEY, "words_list" TEXT NOT NULL, "author" varchar NOT NULL);

/* INNER JOIN */
SELECT questions.id AS question_id, description, option_a, option_b, option_c, option_d, difficulties.name AS difficulty, question_subjects.subject AS subject, author FROM questions INNER JOIN difficulties ON difficulty = difficulties.id INNER JOIN question_subjects ON questions.subject = question_subjects.id;

/* EITHER on Stream */
CREATE TABLE "either" ("id" SERIAL PRIMARY KEY, "option_1" VARCHAR NOT NULL, "option_2" VARCHAR NOT NULL, "author" VARCHAR NOT NULL);