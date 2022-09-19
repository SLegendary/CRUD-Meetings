<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class autoUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'status:change';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change the status of past time';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $meetings = Meetings::whereDate('etime', '>=', date());
        foreach($meetings as $meeting) {
            Meeting::update('available', true);
        }
    }
}
