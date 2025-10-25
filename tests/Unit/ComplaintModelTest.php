<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Complaint;
use App\Models\ComplaintType;
use App\Models\Campus;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ComplaintModelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function complaint_belongs_to_user()
    {
        $user = User::factory()->create();
        $complaint = Complaint::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $complaint->user);
        $this->assertEquals($user->id, $complaint->user->id);
    }

    /** @test */
    public function complaint_belongs_to_complaint_type()
    {
        $complaintType = ComplaintType::factory()->create();
        $complaint = Complaint::factory()->create(['complaint_type_id' => $complaintType->id]);

        $this->assertInstanceOf(ComplaintType::class, $complaint->complaintType);
        $this->assertEquals($complaintType->id, $complaint->complaintType->id);
    }

    /** @test */
    public function complaint_belongs_to_campus()
    {
        $campus = Campus::factory()->create();
        $complaint = Complaint::factory()->create(['campus_id' => $campus->id]);

        $this->assertInstanceOf(Campus::class, $complaint->campus);
        $this->assertEquals($campus->id, $complaint->campus->id);
    }

    /** @test */
    public function complaint_has_default_status()
    {
        $complaint = Complaint::factory()->create();

        $this->assertEquals('pending', $complaint->status);
    }

    /** @test */
    public function complaint_can_have_priority()
    {
        $complaint = Complaint::factory()->create(['priority' => 'high']);

        $this->assertEquals('high', $complaint->priority);
    }

    /** @test */
    public function complaint_can_be_resolved()
    {
        $complaint = Complaint::factory()->create();
        
        $complaint->update(['status' => 'resolved']);

        $this->assertEquals('resolved', $complaint->fresh()->status);
    }
}
