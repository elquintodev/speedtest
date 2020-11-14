<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\TestResultModel;

class TestResult extends ResourceController
{
    use ResponseTrait;

    // private function _enable_cors()
    // {
    //     header('Access-Control-Allow-Origin: *');
    //     header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    //     header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    //     $method = $_SERVER['REQUEST_METHOD'];
    //     if ($method == "OPTIONS") {
    //         die();
    //     }
    // }

    // all results
    public function index()
    {
        $model = new TestResultModel();
        $data['testResults'] = $model->orderBy('id', 'DESC')->findAll();
        return $this->respond($data);
    }

    // get single product
    public function show($id = null)
    {
        $model = new TestResultModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('No Test Result found');
        }
    }

    // create
    public function create()
    {
        $model = new TestResultModel();
        $body = $this->request->getJSON();
        $data = [
            'downloadSpeed' => $body->testResult->downloadSpeed,
            'uploadSpeed'  => $body->testResult->uploadSpeed,
            'date' => $body->testResult->date
        ];

        if ($model->insert($data) === false) {
            // $this->_enable_cors();
            return $this->failValidationError($model->errors()[array_key_first($model->errors())]);
        } else {
            $response = [
                'status'   => 201,
                'error'    => null,
                'messages' => [
                    'success' => 'Test Result created successfully'
                ],
                'id' => $model->getInsertID()
            ];
            return $this->respondCreated($response);
        }
    }

    // update
    public function update($id = null)
    {
        $model = new TestResultModel();
        $id = $this->request->getVar('id');
        $data = [
            'downloadSpeed' => $this->request->getVar('downloadSpeed'),
            'uploadSpeed'  => $this->request->getVar('uploadSpeed'),
            'date' => $this->request->getVar('date')
        ];
        $model->update($id, $data);
        if ($model->save($data) === false) {
            // $this->_enable_cors();
            return $this->failValidationError($model->errors()[array_key_first($model->errors())]);
        } else {
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Test Result updated successfully'
                ]
            ];
            return $this->respond($response);
        }
    }

    // delete
    public function delete($id = null)
    {
        // $this->_enable_cors();
        $model = new TestResultModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Test Result successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('No Test Result found');
        }
    }
}
