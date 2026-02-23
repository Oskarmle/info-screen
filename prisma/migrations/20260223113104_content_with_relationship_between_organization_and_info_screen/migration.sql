-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "contact" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentInfoScreens" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContentInfoScreens_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_name_key" ON "Content"("name");

-- CreateIndex
CREATE INDEX "_ContentInfoScreens_B_index" ON "_ContentInfoScreens"("B");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentInfoScreens" ADD CONSTRAINT "_ContentInfoScreens_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentInfoScreens" ADD CONSTRAINT "_ContentInfoScreens_B_fkey" FOREIGN KEY ("B") REFERENCES "InfoScreen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
