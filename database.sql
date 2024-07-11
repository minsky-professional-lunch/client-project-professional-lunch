-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE IF NOT EXISTS "user" (
	"id" SERIAL PRIMARY KEY,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"username" VARCHAR(100) NOT NULL UNIQUE,
	"password" VARCHAR(100) NOT NULL,
	"isAdmin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS "profiles" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"isMentor" BOOLEAN DEFAULT FALSE,
	"avatar" VARCHAR,
	"first_name" VARCHAR(100) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"email" VARCHAR NOT NULL,
	"gender" INT REFERENCES "genders" NOT NULL,
	"interest" INT REFERENCES "interests" NOT NULL,
	"school" INT REFERENCES "schools",
	"bio" VARCHAR,
	"linkedin" VARCHAR,
	"calendar_link" VARCHAR,
	"availability" INT REFERENCES "availability"
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

CREATE TABLE IF NOT EXISTS "availability" (
	"id" SERIAL PRIMARY KEY,
	"profile_user_id" INT REFERENCES "profiles.user_id",
	"day" INT REFERENCES "days",
	"time" INT REFERENCES "times"
);

CREATE TABLE IF NOT EXISTS "days" (
	"id" SERIAL PRIMARY KEY,
	"day" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "times" (
	"id" SERIAL PRIMARY KEY,
	"time" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "mentorships" (
	"id" SERIAL PRIMARY KEY,
	"requested_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"mentee_id" INT REFERENCES "profiles.user_id" NOT NULL,
	"mentor_id" INT REFERENCES "profiles.user_id" NOT NULL,
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
