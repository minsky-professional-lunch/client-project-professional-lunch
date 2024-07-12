-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE IF NOT EXISTS "user" (
	"id" SERIAL PRIMARY KEY,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"username" VARCHAR(100) NOT NULL UNIQUE,
	"password" VARCHAR(100) NOT NULL,
	"isAdmin" BOOLEAN DEFAULT FALSE,
	"isMentor" BOOLEAN DEFAULT null
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
	"school" INT REFERENCES "schools",
	"bio" VARCHAR,
	"linkedin" VARCHAR,
	"calendar_link" VARCHAR
);

CREATE TABLE IF NOT EXISTS "profiles_availability" (
	"id" SERIAL PRIMARY KEY,
	"profile_id" INT REFERENCES "profiles",
	"availability_id" INT REFERENCES "availability"
);

CREATE TABLE IF NOT EXISTS "profiles_interests" (
	"id" SERIAL PRIMARY KEY,
	"profile_id" INT REFERENCES "profiles",
	"interest_id" INT REFERENCES "interests"
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
	"user_id" INT REFERENCES "user",
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
	"mentee_id" INT REFERENCES "user" NOT NULL,
	"mentor_id" INT REFERENCES "user" NOT NULL,
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
	"notes" VARCHAR,
	"status" VARCHAR DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS "resources" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL, 
  "image" VARCHAR NOT NULL, 
  "url" VARCHAR NOT NULL,
  "about" VARCHAR (500),
  "category" VARCHAR,
  "notes" VARCHAR (500)
);
