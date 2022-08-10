-- CreateTable
CREATE TABLE `association_table` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `business_id` INTEGER UNSIGNED NULL,
    `user_id` INTEGER UNSIGNED NULL,

    INDEX `business_id`(`business_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businesses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `biz_name` VARCHAR(255) NOT NULL,
    `owner` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `business_type` ENUM('Beauty', 'Food', 'Business', 'Hobbies', 'Other') NOT NULL,
    `verified` BOOLEAN NULL,
    `address` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `usersId` INTEGER UNSIGNED NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `business_id` INTEGER UNSIGNED NULL,
    `image` VARCHAR(255) NOT NULL,
    `body` VARCHAR(255) NOT NULL,
    `postedAT` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `business_id`(`business_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `association_table` ADD CONSTRAINT `association_table_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `association_table` ADD CONSTRAINT `association_table_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `businesses` ADD CONSTRAINT `businesses_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
