-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE IF NOT EXISTS "user" (
	"id" SERIAL PRIMARY KEY,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"username" VARCHAR(100) NOT NULL UNIQUE,
	"password" VARCHAR(100) NOT NULL,
	"email" VARCHAR NOT NULL,
	"avatar" VARCHAR,
	"first_name" VARCHAR(100) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"role" INT REFERENCES "roles" NOT NULL
);

CREATE TABLE IF NOT EXISTS "roles" (
	"id" SERIAL PRIMARY KEY,
	"role_type" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "mentees" (
	"id" SERIAL PRIMARY KEY REFERENCES "user",
	"gender" INT REFERENCES "genders" NOT NULL,
	"interests" INT REFERENCES "interests" NOT NULL,
	"school" INT REFERENCES "schools" NOT NULL,
	"bio" VARCHAR,
	"linkedin" VARCHAR
);

CREATE TABLE IF NOT EXISTS "interests" (
	"id" SERIAL PRIMARY KEY,
	"interest" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "genders" (
	"id" SERIAL PRIMARY KEY,
	"gender" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "schools" (
	"id" SERIAL PRIMARY KEY,
	"school" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "mentors" (
	"id" SERIAL PRIMARY KEY REFERENCES "user",
	"gender" INT REFERENCES "genders" NOT NULL,
	"interest" INT REFERENCES "interests" NOT NULL,
	"bio" VARCHAR(500) NOT NULL,
	"linkedin" VARCHAR,
	"calendar_link" VARCHAR
);

CREATE TABLE IF NOT EXISTS "availability" (
	"id" SERIAL PRIMARY KEY REFERENCES "mentors",
	"day" INT REFERENCES "days",
	"time" INT REFERENCES "times"
);

CREATE TABLE IF NOT EXISTS "days" (
	"id" SERIAL PRIMARY KEY,
	"day" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "times" (
	"id" SERIAL PRIMARY KEY,
	"time" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "mentorships" (
	"id" SERIAL PRIMARY KEY,
	"requested_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"mentee_id" INT REFERENCES "mentees" NOT NULL,
	"mentor_id" INT REFERENCES "mentors" NOT NULL,
	"status" VARCHAR DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS "meetings" (
	"id" SERIAL PRIMARY KEY,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"mentorship_id" INT REFERENCES "mentorships" NOT NULL,
	"date" DATE NOT NULL,
	"start" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	"end" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
 	"link" VARCHAR,
	"location" VARCHAR,
	"notes" VARCHAR
);
