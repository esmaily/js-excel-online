<?php


class Database
{
	/**
	 * @var
	 */
	public static $connect;
	private $host;
	private $db;
	private $user;
	private $pass;
	/**
	 * Database constructor.
	 */
	public function __construct()
	{
		$this->host='127.0.0.1';
		$this->db='data_grid';
		$this->user='root';
		$this->pass='';
 
		$this->_init();
	}
	
	/**
	 * @return PDO
	 */
	private function _init()
	{
	
		if ( !self::$connect ) {
			try {
				$DBH = new PDO( "mysql:host=$this->host;dbname=$this->db", $this->user, $this->pass );
				$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
				return self::$connect = $DBH;
			} catch ( PDOException $e ) {
				echo 'ERROR: ' . $e->getMessage();
			}
		} else {
			return self::$connect;
		}
	}
	
	/**
	 * @param $sql
	 *
	 * @return sql records
	 */
	public function all($sql)
	{
		$STH = self::$connect->prepare( $sql );
		  $STH->execute();
		$STH->setFetchMode( PDO::FETCH_ASSOC );
		$records = $STH->fetchAll( PDO::FETCH_ASSOC );
		return $records;
	}
	
	/**
	 * @param      $sql
	 * @param bool $all
	 *
	 * @return sql records
	 */
	public function get($sql)
	{
		$stmt    = self::$connect->query( $sql );
		$record = $stmt->fetch( PDO::FETCH_ASSOC );
		return $record;
	}
	public function find($sql, $all = false)
	{
		$stmt    = self::$connect->query( $sql);
		$records = $all ? $stmt->fetchAll( PDO::FETCH_ASSOC ) : $stmt->fetch( PDO::FETCH_ASSOC );
		return $records;
	}
	public function query($sql)
	{
		$stmt    = self::$connect->query( $sql);
		return self::$connect->lastInsertId();
	}
	
	
}