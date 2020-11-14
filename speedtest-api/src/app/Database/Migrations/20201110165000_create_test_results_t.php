<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTestResults extends Migration
{

    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'date' => [
                'type' => 'DATETIME',
                'null' => false
            ],
            'downloadSpeed' => [
                'type' => 'DECIMAL',
                'constraint' => '10,2',
                'null' => false
            ],
            'uploadSpeed' => [
                'type' => 'DECIMAL',
                'constraint' => '10,2',
                'null' => false
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('testResults', true);
    }

    public function down()
    {
        $this->forge->dropTable('testResults');
    }
}
