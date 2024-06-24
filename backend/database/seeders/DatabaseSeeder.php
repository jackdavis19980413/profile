<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PersonalProfile;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'id' => 1,
            'name' => 'Jack Davis',
            'email' => 'zura@example.com',
            'password' => bcrypt('1234!@#$'),
            'email_verified_at' => time()
        ]);
        PersonalProfile::factory()->create([
            'firstname' => 'Jack',
            'lastname' => 'Davis',
            'email' => 'abc@abc.com',
            'picture' => 'assets/img/profile_picture_adjusted.png',
            'subtitle' => 'computer expert',
        ]);
    }
}
