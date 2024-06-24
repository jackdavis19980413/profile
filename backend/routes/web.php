<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\PersonalProfileController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApiController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::get('/api/nav', [ApiController::class, 'getNavInformation']);
Route::get('/api/content', [ApiController::class, 'getContentInformation']);
Route::get('/api/page', [ApiController::class, 'getPageInformation']);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard'); 
    Route::get('/resume/basic', [ResumeController::class, 'editpage'])->name('resume.basic'); 
    Route::post('/resume/change/{profile}', [ResumeController::class, 'change'])->name('resume.change'); 
    Route::post('/resume/update/{social}', [ResumeController::class, 'socialUpdate'])->name('resume.socialUpdate'); 
    Route::delete('/resume/delete/{social}', [ResumeController::class, 'socialDelete'])->name('resume.socialDelete'); 
    Route::resource('resume', ResumeController::class);
    Route::resource('skill', SkillController::class);
    Route::resource('experience', ExperienceController::class);
    Route::resource('project', ProjectController::class);
    Route::get('/skill/{skill}/items', [SkillController::class, 'items'])->name('skill.items'); 
    Route::get('/skill/{skill}/items/create', [SkillController::class, 'createItem'])->name('skill.createItem'); 
    Route::post('/skill/{skill}/items/store', [SkillController::class, 'storeItem'])->name('skill.storeItem'); 
    Route::get('/skill/{skill}/items/{item}/edit', [SkillController::class, 'editItem'])->name('skill.editItem'); 
    Route::post('/skill/{skill}/items/{item}/update', [SkillController::class, 'updateItem'])->name('skill.updateItem'); 
    Route::delete('/skill/{skill}/items/{item}/delete', [SkillController::class, 'deleteItem'])->name('skill.deleteItem'); 
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
