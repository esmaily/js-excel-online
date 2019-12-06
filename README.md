# Data maker  GridList 
---
> For support and work project old browsers such as `IE 6` should config and compile with [bablejs](https://babeljs.io/)

Hi Developer  for work minics project should by done this steps:.

* setp 1 execute sql scripts
* assign permissions table
* make new grid example


#### Step 1 :

> After created database and config run this sql

##### column_permissions table:

```
create table column_permissions (
    id  bigint(25) unsigned auto_increment   primary key,
    table_name varchar(100) not null,
    field      varchar(255) not null,
    bg         varchar(20)  null
)
```

##### user_group_column_permissions table:

```
create table user_group_column_permissions
(
    user_group_id        int     not null,
    column_permission_id int     null,
    readable             tinyint null,
    writeable            tinyint null,
    id                   bigint auto_increment
        primary key
);

```

##### user_group table:

```
create table user_group
(
    user_group_id               int(11) unsigned auto_increment
        primary key,
    user_group_id_code          varchar(255) default '''' not null,
    user_group_name             varchar(255) default '''' not null,
    user_group_chamod           text                      null,
    user_group_limit            text                      null,
    user_group_on_list_remark   tinyint(1)                null,
    user_group_status           tinyint(1)                not null,
    user_group_company          tinyint(1)   default 0    not null,
    user_group_admin_permission tinyint(1)   default 0    not null,
    user_group_add_by_company   tinyint(1)   default 0    not null
)

```

#### Step 2 :

> Assign permission for every table in permissions.php file

#### Step 3 :

##### html codes:

> must table id same `table_name` and contcat `_list` for example `table_name +_list`

```
 <table id="fleet_contracts_list" class="table table-striped table-bordered excel-table">
   <thead>
        <!--compile auto with Grid class->
   </thead>
    <tbody>
     <!--compile auto with Grid class-->
    </tbody>
</table>
```

##### js codes:

> before use gird must import `Grid` class

| Key | Type | Required | Default |  Description |
| --- | ---- | -------- | ------- | ----------- |
| primaryKey | string | No | id | table primary key
| girdId | string | yes | --- | `table_name +_list`
| fields | object | yes | --- |  
| data | array | yes | [ ]  |  
| exable | boolean | no | true |  
```
 var  fields = {};
    __app.ajax({"key": "renderGrid", "table": "fleet_contracts"}).then(response => {
        response['fields'].forEach(item => {
            Object.assign(fields, {
                [item.field]: {
                    key: item.field,
                    label: item.field,
                    sortable: item.sortable,
                    bg: item.bg,
                }
            })

        })
       
         __grid.init({
             gridId:'fleet_contracts_list',
             fields:fields,
             data:response['items'],
             gridable:true
        })
       
    });
```

#### Step 4 :

> All request send to api.php must when send ajax request send `key`

##### example remove item:

###### js param codes

```
  __app.ajax({
  "key": "remove_item",
  "table": "fleet_contracts"
  "id":41
  })
```

###### backend managed by key

```
 case 'remove_item':
        $sql    = "DELETE FROM {$data->table_name} WHERE id={$data->id}";
        $result = $db->query( $sql );
        break;
```
