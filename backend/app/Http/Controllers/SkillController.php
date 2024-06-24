<?php

namespace App\Http\Controllers;

use App\Http\Requests\SkillRequest;
use App\Http\Requests\ItemRequest;
use App\Http\Resources\SkillResource;
use App\Http\Resources\ItemResource;

use App\Models\Skill;
use App\Models\Item;

use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::query()->get();
        $skills = SkillResource::collection($skills);

        return inertia("Skill/Index", [
            'skills' => $skills,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Skill/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SkillRequest $request)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;

        if ($image) {
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
        }
        Skill::create($data);

        return to_route('skill.index')
            ->with('success', 'Basic information successfully updated.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Skill $skill)
    {
        return inertia('Skill/Edit', [
            'skill' => new SkillResource($skill),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SkillRequest $request, Skill $skill)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        if ($image) {
            $this->deleteFile($skill->src);
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
        }
        $skill->update($data);

        return to_route('skill.index')
            ->with('success', "Skill \"$skill->index\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        $index = $skill->index;
        $this->deleteFile($skill->src);
        foreach($skill->items as $one) {
            $one->delete();
        }
        $skill->delete();
        
        return to_route('skill.index')
            ->with('success', "Skill \"$index\" was deleted");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function items(Skill $skill)
    {
        $items = Skill::query('id', $skill)->first()->items;
        $items = ItemResource::collection($items);

        return inertia("Skill/Items/Index", [
            'skill' => $skill,
            'items' => $items,
        ]);
    }

    public function createItem(Skill $skill)
    {
        return inertia("Skill/Items/Create", [
            'skill' => $skill,
        ]);
    }

    public function storeItem(ItemRequest $request, Skill $skill)
    {
        $data = $request->validated();

        Item::create($data);

        return to_route('skill.items', [
            'skill' => $skill,
        ])->with('success', 'Basic information successfully updated.');
    }

    public function editItem(Skill $skill, Item $item)
    {
        return inertia('Skill/Items/Edit', [
            'skill' => $skill,
            'item' => $item,
        ]);
    }

    public function updateItem(ItemRequest $request, Skill $skill, Item $item)
    {
        $data = $request->validated();        
        $item->update($data);

        return to_route('skill.items', [
            'skill' => $skill,
        ])->with('success', "Item was updated");
    }

    public function deleteItem(Skill $skill, Item $item)
    {
        $item->delete();
        return to_route('skill.items', [
            'skill' => $skill,
        ])->with('success', "Item was removed");
    }

    private function deleteFile(string $path) {
        if (file_exists($path)) {
            unlink($path);
        }
    }
}
