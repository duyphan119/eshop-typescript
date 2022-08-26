-- DropIndex
DROP INDEX "Banner_slug_key";

-- AlterTable
ALTER TABLE "Banner" ALTER COLUMN "slug" SET DEFAULT '';
