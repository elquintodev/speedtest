<?php 
namespace App\Models;
use CodeIgniter\Model;

class TestResultModel extends Model
{
    protected $table = 'testResults';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id', 'downloadSpeed', 'uploadSpeed', 'date'];

    protected $validationRules    = [
        'downloadSpeed' => 'required|decimal|greater_than[0]',
        'uploadSpeed' => 'required|decimal|greater_than[0]',
        'date' => 'required|valid_date',
    ];

}