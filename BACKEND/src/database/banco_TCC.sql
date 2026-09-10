CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` text UNIQUE NOT NULL,
  `password_hash` text NOT NULL,
  `created_at` text NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `plant_catalog` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `popular_name` text NOT NULL,
  `ideal_humidity` real NOT NULL,
  `ideal_ph_min` real NOT NULL,
  `ideal_ph_max` real NOT NULL,
  `ideal_salinity_min` real NOT NULL,
  `ideal_salinity_max` real NOT NULL,
  `care_tips` text
);

CREATE TABLE `my_crops` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `plant_id` integer NOT NULL,
  `device_code` text UNIQUE NOT NULL,
  `nickname` text NOT NULL,
  `alerts` text,
  `last_watered_at` text,
  `created_at` text NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `sensor_readings` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `crop_id` integer NOT NULL,
  `humidity_value` real NOT NULL,
  `ph_value` real NOT NULL,
  `salinity_value` real NOT NULL,
  `created_at` text NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX `idx_users_email` ON `users` (`email`);

CREATE INDEX `idx_crops_user_id` ON `my_crops` (`user_id`);

CREATE INDEX `idx_crops_device_code` ON `my_crops` (`device_code`);

CREATE INDEX `idx_sensor_crop_history` ON `sensor_readings` (`crop_id`, `created_at`);

ALTER TABLE `my_crops` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `my_crops` ADD FOREIGN KEY (`plant_id`) REFERENCES `plant_catalog` (`id`);

ALTER TABLE `sensor_readings` ADD FOREIGN KEY (`crop_id`) REFERENCES `my_crops` (`id`) ON DELETE CASCADE;
