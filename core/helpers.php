<?php 

/**
 * Prepare permission fields
 * @param array $data
 *
 * @return array
 */
function preparePermissionFields(array $data) : array
{
	$fields = [];
	foreach ( $data as $item ) {
		if ( array_key_exists( $item['field'], $fields ) ) {
			$item['writeable'] ? array_push( $fields[$item['field']]['writeable'], $item['role'] ) : null;
			$item['readable'] ? array_push( $fields[$item['field']]['readable'], $item['role'] ) : null;
		} else {
			$fields[$item['field']] = [
				'writeable' => $item['writeable'] ? [ $item['role'] ] : [],
				'readable'  => $item['readable'] ? [ $item['role'] ] : [],
			];
		}
	}
	return $fields;
}