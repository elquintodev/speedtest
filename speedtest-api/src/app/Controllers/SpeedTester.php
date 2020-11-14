<?php namespace App\Controllers;
use CodeIgniter\HTTP\Response;

class SpeedTester extends BaseController
{
	public function index()
	{
		
	}

	public function download()
	{
		$this->response->setStatusCode(Response::HTTP_OK);
		return $this->response->download('../assets/testfile.png', null);
	}

	public function upload()
	{
		$this->response->setStatusCode(Response::HTTP_OK);
		$this->response->send();
	}
}
