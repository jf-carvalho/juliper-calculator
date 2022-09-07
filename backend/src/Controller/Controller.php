<?php

namespace App\Controller;

class Controller
{
    protected $response;
    protected $conn;

    public function __construct()
    {
        $servername = 'juliper-db';
        $port = '3306';
        $username = 'root';
        $password = 'root';
        $database = 'juliper';

        try {
            $this->conn = new \PDO("mysql:host=$servername;port=$port;dbname=$database", $username, $password);
            $this->conn->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            throw $e;
        }
    }

    public function save($request)
    {
        try {
            $data = [
                'month' => $request['month'],
                'his_salary' => $request['his_salary'],
                'her_salary' => $request['her_salary'],
                'outcomes' => $request['outcomes'],
            ];
    
            $sql = "INSERT INTO entries (month, his_salary, her_salary, outcomes) VALUES (:month, :his_salary, :her_salary, :outcomes)";
    
            $stmt= $this->conn->prepare($sql);
            
            $stmt->execute($data);
        } catch (\Throwable $th) {
            throw $th;
        }

        $this->response = [
            'status' => true,
            'message' => "Mês cadastrado com sucesso",
            'data' => $data
        ];
    }

    public function getResponse()
    {
        return $this->response;
    }
}