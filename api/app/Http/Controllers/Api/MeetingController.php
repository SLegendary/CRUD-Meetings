<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meeting;

class MeetingController extends Controller
{
    public function index()
    {
        $meetings = Meeting::orderBy('room')->orderBy('stime')->get();
        return $meetings;
    }

    public function store(Request $request)
    {
        $meeting = new Meeting();
        $meeting->room = $request->room;
        $meeting->stime = $request->stime;
        $meeting->etime = $request->etime;
        $meeting->available = 0;
        $meeting->save();
        
    }

    public function show(Request $request)
    {
        $meetings = Meeting::where('room', $request->room)->get(['stime','etime']);
        return $meetings;
    }

    public function update(Request $request, $id)
    {
        $meeting = Meeting::find($request->id);
        $meeting->available = true;

        $meeting->save();
        return $meeting;
    }

    public function destroy($id)
    {
        $meeting = Meeting::destroy($id);
        return $meeting;
    }

    public function autoUpdate(){
        $meetings = Meetings::whereDate('etime', '>=', date());
        foreach($meetings as $meeting) {
            Meeting::update('available', true);
        }
    }

}
