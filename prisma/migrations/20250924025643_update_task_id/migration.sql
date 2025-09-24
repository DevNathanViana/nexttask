-- AlterTable
ALTER TABLE "public"."task" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'criada';
