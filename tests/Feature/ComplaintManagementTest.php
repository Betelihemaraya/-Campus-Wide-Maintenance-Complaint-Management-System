<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Complaint;
use App\Models\ComplaintType;
use App\Models\Campus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ComplaintManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test data
        $this->user = User::factory()->create();
        $this->complaintType = ComplaintType::factory()->create();
        $this->campus = Campus::factory()->create();
    }

    /** @test */
    public function user_can_create_complaint()
    {
        $complaintData = [
            'title' => 'Broken Door Handle',
            'description' => 'The door handle in room 101 is broken and needs repair.',
            'complaint_type_id' => $this->complaintType->id,
            'campus_id' => $this->campus->id,
            'priority' => 'medium',
            'location' => 'Building A, Room 101'
        ];

        $response = $this->actingAs($this->user)
            ->post('/complaints', $complaintData);

        $response->assertStatus(302);
        $this->assertDatabaseHas('complaints', [
            'title' => 'Broken Door Handle',
            'user_id' => $this->user->id
        ]);
    }

    /** @test */
    public function user_can_view_their_complaints()
    {
        $complaint = Complaint::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->actingAs($this->user)
            ->get('/complaints');

        $response->assertStatus(200);
        $response->assertSee($complaint->title);
    }

    /** @test */
    public function admin_can_view_all_complaints()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $complaint = Complaint::factory()->create();

        $response = $this->actingAs($admin)
            ->get('/admin/complaints');

        $response->assertStatus(200);
        $response->assertSee($complaint->title);
    }

    /** @test */
    public function worker_can_update_complaint_status()
    {
        $worker = User::factory()->create(['role' => 'worker']);
        $complaint = Complaint::factory()->create();

        $response = $this->actingAs($worker)
            ->patch("/complaints/{$complaint->id}/status", [
                'status' => 'in_progress'
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('complaints', [
            'id' => $complaint->id,
            'status' => 'in_progress'
        ]);
    }

    /** @test */
    public function complaint_requires_valid_data()
    {
        $response = $this->actingAs($this->user)
            ->post('/complaints', []);

        $response->assertSessionHasErrors(['title', 'description']);
    }
}
