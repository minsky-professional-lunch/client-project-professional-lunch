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
	"start" TIME WITHOUT TIME ZONE NOT NULL,
	"end" TIME WITHOUT TIME ZONE NOT NULL,
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

INSERT INTO "interests" ("interest")
VALUES
('Architecture'),
('Arts'),
('Business'),
('Education'),
('Engineering'),
('Health Sciences'),
('Human Services'),
('Marketing'),
('Math'),
('Psychology'),
('Veterinary Sciences'),
('Other');

INSERT INTO "genders" ("gender")
VALUES
('Male'),
('Female'),
('Non-Binary'),
('Prefer not to say'),
('Other');

INSERT INTO "schools" ("school")
VALUES
('Fargo Davies'),
('Fargo North'),
('Fargo Shanley'),
('Fargo South'),
('Horace High'),
('Moorhead High'),
('Oak Grove'),
('Park Christian'),
('West Fargo High'),
('West Fargo Sheyenne'),
('Concordia'),
('MSCTC'),
('MSUM'),
('NDSU'),
('Rasmussen'),
('Other');

INSERT INTO "days" ("day")
VALUES
('Monday'),
('Tuesday'),
('Wednesday'),
('Thursday'),
('Friday'),
('Saturday'),
('Sunday');

INSERT INTO "times" ("time")
VALUES
('Morning'),
('Lunch'),
('Afternoon'),
('Evening');

INSERT INTO "resources" ("title", "image", "url", "about", "category", "notes")
VALUES
('Job Service of North Dakota', 'https://play-lh.googleusercontent.com/dLWsSGAegyPMuwSE3mvBSSKCbovH9I0Mc_FbqSfKZ58opcMROedfirw95Smf4idMjg=w240-h480-rw', 'https://www.jobsnd.com/', 'Job Service North Dakota provides workforce and unemployment services across the state in our nine Workforce Centers', 'Jobs', 'A resource for jobs in the state of North Dakota'),
('Job Service of Minnesota', 'https://i0.wp.com/empowerinclusion.org/wp-content/uploads/2020/05/image.png?resize=395%2C127&ssl=1', 'https://mn.gov/deed/programs-services/mn-job-service/', 'Job Service Minnesotas focus is to deliver services to help job seekers find work and help employers find and retain qualified employees.', 'Jobs', 'A resource for jobs in the state of Minnesota');

