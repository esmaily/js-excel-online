<?php 
require('core/Database.php');
require('core/helpers.php');
$db = new Database();
/**
 * input client requests
 *
 * @param key string required
 * @param formData object optional
 *
 * */

$json = file_get_contents( 'php://input' );
$data = json_decode( $json );

$result = [];
switch ( $data->key ) {
	case 'table_list': 
        $tables = [];
		foreach ( $db->all( 'SHOW tables' ) as $key => $table ) {
			if ( $tab = array_values( $table )[0] != 'column_permissions' ) {
				array_push( $tables, array_values( $table )[0] );
			}
		}
		$result['tables'] = $tables;
        break;
        case 'get_fields_by_table':
            $fields            = $db->all( "SHOW COLUMNS FROM `{$data->table}`" );
            $result['records'] = [];
            $colorIndex        = 0;
            foreach ( $fields as $key => $field ) {
                $is_stored = $db->get( "SELECT * FROM `column_permissions` WHERE `table_name`='{$data->table}' AND `field`='{$field['Field']}' " );
                /* store  every field in column_permission if not stored */
                if ( !$is_stored ) {
                    $bg = [
                        '#27ae60',
                        '#546E7A',
                        '#d35400',
                        '#34495e',
                    ];
                    if ( $colorIndex == 3 )
                        $colorIndex = 0;
                    $colorIndex++;
                    $sql = "INSERT INTO `column_permissions` (`table_name`,`field`,`bg`) ";
                    $sql .= "VALUES ('{$data->table}','{$field['Field']}','$bg[$colorIndex]')";
                    $db->query( $sql );
                }
            }
            $sql = "SELECT `cp`.`table_name`,cp.field,ugcp.readable,ugcp.writeable,ugcp.user_group_id,`ug`.`user_group_id_code` as role   ";
            $sql .= "FROM (`column_permissions` as cp  ";
            $sql .= "LEFT JOIN `user_group_column_permissions` as ugcp ON cp.`id`=ugcp.column_permission_id)   ";
            $sql .= "LEFT JOIN `user_group` as ug   ON ugcp.`user_group_id`=ug.user_group_id  ";
            $sql .= "WHERE `cp`.`table_name`='{$data->table}'   ";
            
            $result['fields'] = preparePermissionFields( $db->all( $sql ) );
            $result['roles']  = $db->all( 'SELECT user_group_id_code FROM user_group' );
            break;
        
        case 'renderGrid':
            $sql = "SELECT `cp`.`field`,`cp`.`bg`,`ugcp`.`readable`,`ugcp`.`writeable`,`ug`.`user_group_id_code` as role  ";
            $sql .= " FROM (`column_permissions` as cp ";
            $sql .= " LEFT JOIN `user_group_column_permissions` as ugcp ON `cp`.`id`=`ugcp`.`column_permission_id`) ";
            $sql .= " LEFT JOIN `user_group` as ug   ON `ugcp`.`user_group_id`=`ug`.`user_group_id`  ";
            $sql .= " WHERE `cp`.`table_name`='{$data->table}' AND `ug`.`user_group_id_code`='{$loggedInRole}' AND `ugcp`.`readable`=1 ";
            
            $result['fields'] = $db->all( $sql );
            $pluckFields      = '';
            foreach ( $result['fields'] as $key => $item ) {
                $pluckFields .= '`' . $item['field'] . '`,';
            }
            $pluckFields     .= "`id`";
            $result['items'] = $db->all( "SELECT {$pluckFields} FROM `{$data->table}` " );
            break;
	default:
        $result['message'] = 'no key found';
}
echo json_encode([
	'status'=>200,
	'data'=>$result['data'],
	'message'=> isset($result['message']) ? $result['message'] : null
]);